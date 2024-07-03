import React, { useState, useRef, useEffect, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Question from './question';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RootState } from '../../../setup';
import { CompleteExam, PossibleAnswer, Answer } from '../models/models';
import * as crud from '../redux/EXAMCRUD';
import PAnswer from "../components/PossibleAnswer";
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import BackupTwoToneIcon from '@mui/icons-material/BackupTwoTone';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import DOMPurify from 'dompurify';

const VirtualExam: React.FC = () => {
    const [submittedAnswer, setSubmittedAnswer] = useState<Answer | undefined>(undefined);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [possibleAnswers, setPossibleAnswers] = useState<PossibleAnswer[]>([]);
    const completeExam = useSelector<RootState, CompleteExam | undefined>(({ exam }) => exam?.completeExam, shallowEqual);
    const [showFullScreen, setShowFullScreen] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const sanitizedSummary = DOMPurify.sanitize(completeExam?.quiz.summary);
    const fetchSubmittedAnswer = useCallback(async () => {
        const questionId = completeExam?.questions[selectedQuestionIndex]?.id;
        const examId = completeExam?.exam.id;
        if (examId !== undefined && questionId !== undefined) {
            const subAnswer = await crud.fetchSubmittedAnswer(examId, questionId);
            setSubmittedAnswer(subAnswer);
        }
    }, [completeExam, selectedQuestionIndex]);

    const fetchAnswers = useCallback(async () => {
        const questionId = completeExam?.questions[selectedQuestionIndex]?.id;
        if (questionId !== undefined) {
            try {
                const answers = await crud.fetchPossibleAnswers(questionId);
                setPossibleAnswers(answers);
            } catch (error) {
                console.error('Error fetching possible answers:', error);
            }
        }
    }, [completeExam, selectedQuestionIndex]);


    useEffect(() => {
        if (completeExam?.exam.status === 'review') {
            fetchSubmittedAnswer();
        }
        fetchAnswers();
    }, [completeExam, fetchSubmittedAnswer, fetchAnswers, selectedQuestionIndex]);

    const handlePaginationItemClick = useCallback((index: number) => {
        setSelectedQuestionIndex(index);
    }, []);

    const handleAnswerSelect = useCallback((questionIndex: number, answerIndex: number) => {
        const newSelectedAnswers = {
            ...selectedAnswers,
            [questionIndex]: answerIndex,
        };
        setSelectedAnswers(newSelectedAnswers);
        localStorage.setItem('selectedAnswers', JSON.stringify(newSelectedAnswers));
    }, [selectedAnswers]);


    const saveAnswer = useCallback(async (): Promise<boolean> => {
        if (completeExam?.exam.status !== 'review') {
            const examId = completeExam?.exam.id;
            const answerIndex = selectedAnswers[selectedQuestionIndex];
            const possibleAnswer = possibleAnswers[answerIndex];

            if (examId !== undefined && possibleAnswer?.id !== undefined) {
                const toastId = toast.loading("Saving your answer...");
                try {
                    await crud.saveAnswer(examId, possibleAnswer.id);
                    toast.update(toastId, { render: "Answer saved successfully!", type: "success", isLoading: false, autoClose: 3000 });
                    return true;
                } catch (error) {
                    toast.update(toastId, { render: "Failed to save answer.", type: "error", isLoading: false, autoClose: 3000 });
                    console.error('Error submitting answer:', error);
                    return false;
                }
            } else {
                toast.error('Please select an answer before submitting.');
                return false;
            }
        }
        return false;
    }, [completeExam, possibleAnswers, selectedAnswers, selectedQuestionIndex]);

    const handleNextButtonClick = useCallback(async () => {
        if (completeExam?.exam.status !== 'review') {
            const selectedAnswerIndex = selectedAnswers[selectedQuestionIndex];
            if (selectedAnswerIndex !== undefined) {
                const success = await saveAnswer();
                if (success && completeExam && completeExam.questions && completeExam.questions.length) {
                    const nextQuestionIndex = selectedQuestionIndex + 1;
                    if (nextQuestionIndex < completeExam.questions.length) {
                        setSelectedQuestionIndex(nextQuestionIndex);
                    } else {
                        toast.info('You have reached the end of the exam.');
                    }
                }
            } else {
                const nextQuestionIndex = selectedQuestionIndex + 1;
                if (completeExam && completeExam.questions && nextQuestionIndex < completeExam.questions.length) {
                    setSelectedQuestionIndex(nextQuestionIndex);
                } else {
                    toast.info('You have reached the end of the exam.');
                }
            }
        }
    }, [completeExam, saveAnswer, selectedAnswers, selectedQuestionIndex]);

    const handleButtonClick = useCallback(() => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen()
                .then(() => setShowFullScreen(false))
                .catch(error => console.error('Failed to enter fullscreen mode:', error));
        }
    }, []);

    return (
        <div ref={containerRef}>
            {showFullScreen ? (
                <div className="fullscreen-overlay-virtual">
                    <div className='container-fluid'>
                        <Alert variant="success">
                            <Alert.Heading>Virtual Exam Summary</Alert.Heading>
                            <p dangerouslySetInnerHTML={{ __html: sanitizedSummary }} />
                        </Alert>
                    </div>
                    <Button variant="contained" color="primary" size="large" onClick={handleButtonClick} className="fullscreen-button">Start Virtual Exam</Button>
                </div>
            ) : (
                <div className="row m-0 exam-fullscreen-overlay">
                    <div className='col-md-6'>
                        <div className="card card-xxl-stretch my-5 bg-secondary">
                            <div className="card-header align-items-center border-0 mt-4">
                                <h3 className="card-title align-items-start flex-column">
                                    <div className='d-flex justify-content-center'>
                                        <div className="fw-bolder mb-2 text-dark h1">{completeExam?.exam.title}</div>
                                        <Button variant="contained" color="error" size="large" onClick={saveAnswer}>
                                            <span className='mx-2'>Leave</span> <NavigateNextTwoToneIcon />
                                        </Button>
                                    </div>


                                    <Box sx={{ width: '100%' }}>
                                        <Tabs

                                            textColor="primary"
                                            indicatorColor="primary"
                                            aria-label="secondary tabs example"
                                        >
                                            <Tab value="one" label="Question" sx={{ fontWeight: "1000", fontSize: "18px" }} />

                                        </Tabs>
                                    </Box>
                                </h3>
                            </div>
                            <div className="card-body set-134-percent-height overflow-auto">
                                <Box>
                                    {completeExam && (
                                        <Question questionData={completeExam?.questions[selectedQuestionIndex]} />
                                    )}
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="card card-xxl-stretch my-5 bg-dark">
                            <div className="card-header align-items-center border-0 mt-4">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="fw-bolder mb-2 text-light">Choose your answer carefully</span>
                                </h3>
                                <div className='card-toolbar'>
                                    <Button variant="contained" color="success" size="large" onClick={saveAnswer}>
                                        <span className='mx-2'>Submit</span> <BackupTwoToneIcon />
                                    </Button>
                                    <Button className='mx-2' variant="contained" color="primary" size="large" onClick={handleNextButtonClick}>
                                        <span className='mx-2'>Next</span> <NavigateNextTwoToneIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className="card-body set-80-percent-height overflow-auto">
                                <Box>
                                    {possibleAnswers.map((item: PossibleAnswer, index: number) => (
                                        <PAnswer
                                            key={index}
                                            possibleAnswer={item}
                                            index={index}
                                            isSelected={selectedAnswers[selectedQuestionIndex] === index}
                                            onSelect={() => handleAnswerSelect(selectedQuestionIndex, index)}
                                            status={completeExam?.exam.status}
                                            submittedAnswer={submittedAnswer}
                                        />
                                    ))}
                                </Box>
                                <div className="pagination">
                                    <Stack spacing={2}>
                                        <Pagination
                                            showFirstButton
                                            showLastButton
                                            size="large"
                                            color="primary"
                                            count={completeExam?.questions.length}
                                            page={selectedQuestionIndex + 1}
                                            onChange={(event, value) => handlePaginationItemClick(value - 1)}
                                            renderItem={(item) => {
                                                const { onClick, ...rest } = item;
                                                const questionIndex = (item.page ?? 1) - 1;
                                                const isQuestionSelected = selectedAnswers[questionIndex] !== undefined;
                                                return (
                                                    <PaginationItem
                                                        {...rest}
                                                        onClick={() => handlePaginationItemClick(questionIndex)}
                                                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                        sx={{ color: isQuestionSelected ? '#1976d2' : 'white', fontSize: "20px" }}
                                                    />
                                                );
                                            }}
                                        />
                                    </Stack>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VirtualExam;
