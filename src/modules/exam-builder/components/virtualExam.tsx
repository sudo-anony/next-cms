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
import { CompleteExam, PossibleAnswer, Answer, CodeLanguages } from '../models/models';
import * as crud from '../redux/EXAMCRUD';
import PAnswer from '../components/PossibleAnswer';
import { toast } from 'react-toastify';
import { Autocomplete, Button, TextField } from '@mui/material';
import BackupTwoToneIcon from '@mui/icons-material/BackupTwoTone';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import Editor from '@monaco-editor/react';
import { AxiosResponse } from 'axios';

const VirtualExam: React.FC = () => {
    const [submittedAnswer, setSubmittedAnswer] = useState<Answer | undefined>(undefined);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | number }>({});
    const [possibleAnswers, setPossibleAnswers] = useState<PossibleAnswer[]>([]);
    const completeExam = useSelector<RootState, CompleteExam | undefined>(({ exam }) => exam?.completeExam, shallowEqual);
    const [showFullScreen, setShowFullScreen] = useState(true);
    const [languages, setLanguages] = useState<CodeLanguages[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguages | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [codeAnswers, setCodeAnswers] = useState<{ [key: number]: string }>({});

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


    const submitCodeAnswer = useCallback(async (cAnswer: string) => {
        const formData = new FormData();
        formData.append('source_code', cAnswer);
        formData.append('language_id', String(selectedLanguage?.id || 1));
        formData.append('stdin', 'world');
        console.log(formData)
        await crud.submitCode(formData);
    }, [selectedLanguage]);



    const fetchLanguages = useCallback(async () => {
        try {
            const response: AxiosResponse<CodeLanguages[]> = await crud.fetchLanguages();
            setLanguages(response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }, []);

    useEffect(() => {
        if (completeExam?.exam.status === 'review') {
            fetchSubmittedAnswer();
        }
        fetchAnswers();
        fetchLanguages();
    }, [completeExam, fetchSubmittedAnswer, fetchAnswers, fetchLanguages, selectedQuestionIndex]);

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

    const handleCodeChange = useCallback((value: string | undefined) => {
        setCodeAnswers((prevCodeAnswers) => ({
            ...prevCodeAnswers,
            [selectedQuestionIndex]: value || '',
        }));
    }, [selectedQuestionIndex]);

    const saveAnswer = useCallback(async (): Promise<boolean> => {
        if (completeExam?.exam.status !== 'review') {
            const examId = completeExam?.exam.id;
            const answerIndex = selectedAnswers[selectedQuestionIndex];
            const possibleAnswer = possibleAnswers[answerIndex as number];

            if (examId !== undefined && possibleAnswer?.id !== undefined) {
                const toastId = toast.loading('Saving your answer...');
                try {
                    await crud.saveAnswer(examId, possibleAnswer.id);
                    toast.update(toastId, { render: 'Answer saved successfully!', type: 'success', isLoading: false, autoClose: 3000 });
                    return true;
                } catch (error) {
                    toast.update(toastId, { render: 'Failed to save answer.', type: 'error', isLoading: false, autoClose: 3000 });
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
        setShowFullScreen(false);
    }, []);

    const handleLanguageSelect = useCallback((event: any, newValue: CodeLanguages | null) => {
        setSelectedLanguage(newValue);
        setCodeAnswers({});
    }, []);



    const saveCodeAnswer = () => {
        debugger
        const cAnswer = btoa(codeAnswers['0']);
        submitCodeAnswer(cAnswer);
    }

    const languageTemplates: { [key: string]: string } = {
        assembly: `section .data
    hello db 'Hello, World!',0
    
    section .text
    global _start
    
    _start:
        mov edx, len
        mov ecx, hello
        mov ebx, 1
        mov eax, 4
        int 0x80
    
        mov eax, 1
        int 0x80
    
    len equ $ - hello`,
        bash: `echo "Hello, World!"`,
        basic: `PRINT "Hello, World!"`,
        c: `#include <stdio.h>
    
    int main() {
        printf("Hello, World!");
        return 0;
    }`,
        cpp: `#include <iostream>
    
    int main() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }`,
        clojure: `(println "Hello, World!")`,
        'c#': `using System;
    
    class Program {
        static void Main() {
            Console.WriteLine("Hello, World!");
        }
    }`,
        cobol: `IDENTIFICATION DIVISION.
    PROGRAM-ID. HelloWorld.
    PROCEDURE DIVISION.
    DISPLAY 'Hello, World!'.
    STOP RUN.`,
        'common lisp': `(format t "Hello, World!")`,
        d: `import std.stdio;
    
    void main() {
        writeln("Hello, World!");
    }`,
        elixir: `IO.puts "Hello, World!"`,
        erlang: `-module(hello).
    -export([hello_world/0]).
    
    hello_world() ->
        io:format("Hello, World!~n").`,
        fsharp: `printfn "Hello, World!"`,
        fortran: `program hello
        print *, "Hello, World!"
    end program hello`,
        go: `package main
    
    import "fmt"
    
    func main() {
        fmt.Println("Hello, World!")
    }`,
        groovy: `println 'Hello, World!'`,
        haskell: `main = putStrLn "Hello, World!"`,
        java: `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`,
        javascript: `console.log("Hello, World!");`,
        kotlin: `fun main() {
        println("Hello, World!")
    }`,
        lua: `print("Hello, World!")`,
        'objective-c': `#import <Foundation/Foundation.h>
    
    int main() {
        @autoreleasepool {
            NSLog(@"Hello, World!");
        }
        return 0;
    }`,
        ocaml: `print_endline "Hello, World!"`,
        octave: `disp("Hello, World!")`,
        pascal: `program HelloWorld;
    begin
        writeln('Hello, World!');
    end.`,
        perl: `print "Hello, World!\\n";`,
        php: `<?php
    echo "Hello, World!";
    ?>`,
        plaintext: `Hello, World!`,
        prolog: `:- initialization(main).
    
    main :-
        write('Hello, World!'), nl.`,
        python2: `print "Hello, World!"`,
        python3: `print("Hello, World!")`,
        r: `cat("Hello, World!\\n")`,
        ruby: `puts "Hello, World!"`,
        rust: `fn main() {
        println!("Hello, World!");
    }`,
        scala: `object HelloWorld {
        def main(args: Array[String]): Unit = {
            println("Hello, World!")
        }
    }`,
        sql: `SELECT 'Hello, World!';`,
        swift: `print("Hello, World!")`,
        typescript: `console.log("Hello, World!");`,
        'visual basic.net': `Module HelloWorld
        Sub Main()
            Console.WriteLine("Hello, World!")
        End Sub
    End Module`
    };

    return (
        <div ref={containerRef}>
            {showFullScreen ? (
                <div className="fullscreen-overlay-virtual">
                    <div className='container-fluid'>
                        <Alert variant="success">
                            <Alert.Heading>Virtual Exam Summary</Alert.Heading>
                            <p dangerouslySetInnerHTML={{ __html: completeExam?.quiz.summary || '' }} />
                        </Alert>
                    </div>
                    <Button variant="contained" color="primary" size="large" onClick={handleButtonClick} className="fullscreen-button">Start Virtual Exam</Button>
                </div>
            ) : (
                <div className="row m-0 exam-fullscreen-overlay">
                    <div className='col-md-6'>
                        <div className="card card-xxl-stretch my-5 bg-secondary" style={{ height: '100%' }}>
                            <div className="card-header align-items-center border-0 mt-4">
                                <h3 className="card-title align-items-start flex-column">
                                    <div className="fw-bolder  text-dark h1">{completeExam?.exam.title}</div>
                                </h3>
                                <div className='card-toolbar'>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={languages}
                                        getOptionLabel={(option) => option.name}
                                        sx={{ width: 300 }}
                                        value={selectedLanguage}
                                        onChange={handleLanguageSelect}
                                        renderInput={(params) => <TextField {...params} label="Select a Language" />}
                                    />
                                </div>
                            </div>
                            <div className="card-body set-134-percent-height overflow-auto">
                                <Box sx={{ width: '100%' }}>
                                    <Tabs
                                        textColor="primary"
                                        indicatorColor="primary"
                                        aria-label="secondary tabs example"
                                    >
                                        <Tab value="one" label="Question" sx={{ fontWeight: "1000", fontSize: "18px" }} />
                                    </Tabs>
                                </Box>
                                <Box sx={{ height: '100%' }}>
                                    {completeExam && (
                                        <Question questionData={completeExam?.questions[selectedQuestionIndex]} />
                                    )}
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {completeExam && completeExam?.questions[selectedQuestionIndex].question_type === 'code' && (
                            <>
                                <Editor
                                    key={selectedQuestionIndex}
                                    className='mt-5 rounded'
                                    height="90vh"
                                    defaultLanguage={selectedLanguage?.name.split(' (')[0].toLowerCase()}
                                    value={codeAnswers[selectedQuestionIndex] || languageTemplates[selectedLanguage?.name.split(' (')[0].toLowerCase()] || ''}
                                    onChange={handleCodeChange}
                                    onMount={(editor) => editor.updateOptions({ theme: 'vs-dark' })}
                                />
                                <div className="card card-xxl-stretch mt-1" style={{ height: '10vh', background: 'black' }}>
                                    <div className="card-body set-80-percent-height overflow-auto">
                                        <div className="d-flex justify-content-around">
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
                                                                sx={{ color: isQuestionSelected ? '#1976d2' : 'white', fontSize: '20px' }} />
                                                        );
                                                    }} />
                                            </Stack>
                                            <div>
                                                <Button variant="contained" color="success" size="large" onClick={saveCodeAnswer}>
                                                    <span className='mx-2'>Compile</span> <BackupTwoToneIcon />
                                                </Button></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {completeExam && completeExam?.questions[selectedQuestionIndex].question_type === 'choices' && (
                            <div className="card card-xxl-stretch my-5 bg-dark" style={{ height: '100%' }}>
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
                                    <div className="pagination">
                                        <Stack spacing={2}>
                                            <Pagination
                                                showFirstButton
                                                showLastButton
                                                size="large"
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
                                                            sx={{ color: isQuestionSelected ? '#1976d2' : 'white', fontSize: '20px' }}
                                                        />
                                                    );
                                                }}
                                            />
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VirtualExam;
