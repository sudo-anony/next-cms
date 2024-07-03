import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Doughnut, Line, Pie, PolarArea } from 'react-chartjs-2';
import * as crud from '../redux/EXAMCRUD';
import 'chart.js/auto';
import { ResultData } from '../models/models';
import { Button } from '@mui/material';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Recommendation from './recommendation';
import { KTSVG } from '@/theme/helpers';

const Result: React.FC = () => {
    const router = useRouter();
    const { examId } = router.query;
    const [result, setResult] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const accuracyPercentage = 60;
    const difficulty = 'easy';
    const attempted = 8;
    const correct = 6;
    const incorrect = 2;
    const unattempted = 2;

    useEffect(() => {
        if (router.isReady && examId) {
            fetchExamResultData(examId);
        }
    }, [router.isReady, examId]);

    async function fetchExamResultData(id: any) {
        try {
            setLoading(true);
            const response = await crud.result(id);
            setResult(response.data);
        } catch (error) {
            setError('Failed to fetch exam result.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const timeTakenData = {
        labels: result ? result.submitted_data.map((data, index) => `Q${index + 1}`) : [],
        datasets: [
            {
                label: 'Time Taken (seconds)',
                data: result ? result.submitted_data.map(data => data) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const accuracyData = {
        labels: ['Correct', 'Incorrect', 'Not attempted'],
        datasets: [
            {
                data: [
                    result ? result.submitted_data.filter(data => data).length : 0,
                    result ? result.submitted_data.filter(data => !data).length : 0,
                    0
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'orange'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'orange'],
                borderWidth: 1,
            }
        ]
    };

    const otherData1 = {
        labels: ['Correct', 'Incorrect', 'Not attempted'],
        datasets: [
            {
                data: [
                    result ? result.submitted_data.filter(data => data).length : 0,
                    result ? result.submitted_data.filter(data => !data).length : 0,
                    0
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'orange'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'orange'],
                borderWidth: 1,
            }
        ]
    };
    const otherData2 = {
        labels: ['Overall', 'Gain'],
        datasets: [
            {
                data: [
                    result ? result.submitted_data.filter(data => data).length : 0,
                    result ? result.submitted_data.filter(data => !data).length : 0,
                    0
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'orange'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'orange'],
                borderWidth: 1,
            }
        ]
    };

    function createData(
        title: string,
        correctAnswer: string,
        yourAnswer: string,
        status: string,
    ) {
        return { title, correctAnswer, yourAnswer, status };
    }


    const rows = [
        createData('Frozen yoghurt', "159", '6.0', '24'),
        createData('Frozen yoghurt', "159", '6.0', '24'),
        createData('Frozen yoghurt', "159", '6.0', '24'),
        createData('Frozen yoghurt', "159", '6.0', '24')
    ];

    return (
        <div className='fullscreen-overlay-result'>
            <div className='container-fluid p-5'>
                {result ? (
                    <>
                        <div className='card card-xxl-stretch my-5 bg-dark'>
                            <div className="card-header align-items-center border-0 mt-4">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="fw-bolder mb-2 h1 text-white">{result.exam.title}</span>
                                    <span className="fw-bolder mb-2 h5 text-muted">Total Questions: {result.submitted_data.length} </span>
                                </h3>
                                <div className='card-toolbar'>
                                    <Button variant="contained" color="info" size="large" >
                                        <span className='mx-2'>Leave</span> <NavigateNextTwoToneIcon />
                                    </Button>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='row my-5'>
                                    <div className='chart-container col-md-3'>
                                        <Line data={timeTakenData} />
                                    </div>
                                    <div className='chart-container col-md-3'>
                                        <PolarArea data={accuracyData} />
                                    </div>
                                    <div className='chart-container col-md-3'>
                                        <Line data={otherData1} />
                                    </div>
                                    <div className='chart-container col-md-3'>
                                        <Doughnut data={otherData2} />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='card card-xxl-stretch bg-dark'>
                                    <div className="card-header align-items-center border-0 mt-4">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="fw-bolder mb-2 h1 text-white">Exam Performance Analysis</span>
                                        </h3>
                                    </div>
                                    <div className='card-body'>

                                        <Recommendation
                                            accuracyPercentage={accuracyPercentage}
                                            difficulty={difficulty}
                                            attempted={attempted}
                                            correct={correct}
                                            incorrect={incorrect}
                                            unattempted={unattempted}
                                        />

                                    </div>
                                </div>

                            </div>
                            <div className='col-md-6'>
                                <div className='card card-xl-stretch mb-5 mb-xl-8'>
                                    <div className='card-header border-0'>
                                        <h3 className='card-title fw-bolder text-dark'>Appeared questions</h3>
                                    </div>
                                    <div className='card-body pt-0'>
                                        <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
                                            <span className='svg-icon svg-icon-warning me-5'>
                                                <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                                            </span>
                                            <div className='flex-grow-1 me-2'>
                                                <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
                                                    Group lunch celebration
                                                </a>
                                                <span className='text-muted fw-bold d-block'>Due in 2 Days</span>
                                            </div>
                                            <span className='fw-bolder text-warning py-1'>+28%</span>
                                        </div>
                                        <div className='d-flex align-items-center bg-light-success rounded p-5 mb-7'>
                                            <span className='svg-icon svg-icon-success me-5'>
                                                <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                                            </span>
                                            <div className='flex-grow-1 me-2'>
                                                <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
                                                    Navigation optimization
                                                </a>
                                                <span className='text-muted fw-bold d-block'>Due in 2 Days</span>
                                            </div>
                                            <span className='fw-bolder text-success py-1'>+50%</span>
                                        </div>
                                        <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
                                            <span className='svg-icon svg-icon-danger me-5'>
                                                <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                                            </span>
                                            <div className='flex-grow-1 me-2'>
                                                <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
                                                    Rebrand strategy planning
                                                </a>
                                                <span className='text-muted fw-bold d-block'>Due in 5 Days</span>
                                            </div>
                                            <span className='fw-bolder text-danger py-1'>-27%</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </>
                ) : (
                    <div>No result data available.</div>
                )}
            </div>
        </div>
    );
};

export default Result;
