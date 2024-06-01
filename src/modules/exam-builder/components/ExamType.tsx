import React, { useState } from 'react';
import { KTSVG } from '@/theme/helpers';
import { ExamMain } from "../../../theme/partials/modals/exam/main";
import AllConfedentialExams from './AllConfedentialExams';

const ExamType = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='card mb-10'>
                <div className='card-body d-flex align-items-center py-8'>
                    {/* Icon */}
                    <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
                        <KTSVG
                            path='/media/icons/duotune/abstract/abs051.svg'
                            className='svg-icon-primary position-absolute opacity-15'
                            svgClassName='h-80px w-80px'
                        />
                        <KTSVG
                            path='/media/icons/duotune/coding/cod009.svg'
                            className='svg-icon-3x svg-icon-primary position-absolute'
                        />
                    </div>
                    {/* Description */}
                    <div className='ms-6'>
                        <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
                            Our platform offers two types of exams: Quick Exams and Personalized Exams using AI.
                            Quick Exams utilize tokens for immediate setup and testing. Personalized Exams use
                            AI to generate tailored exams for any subject—just specify the subject name and
                            question count, and you're ready to go..
                        </p>
                    </div>
                    {/* Description */}
                </div>
            </div>

            <div className={`card card-xl-stretch mb-xl-8`}>
                <div className={`card-header border-0 py-5 bg-danger`}>
                </div>
                <div className='card-body p-0'>
                    <div className={`mixed-widget-2-chart card-rounded-bottom bg-danger`}></div>
                    <div className='card-p mt-n20 position-relative'>
                        <div className='row g-0'>
                            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7 cursor-pointer'>
                                <KTSVG
                                    path='/media/icons/duotune/general/gen032.svg'
                                    className='svg-icon-3x svg-icon-warning d-block my-2'
                                />
                                <a href='#' className='text-warning fw-bold fs-6'>
                                    Personalized Exam
                                </a>
                            </div>
                            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7 cursor-pointer' onClick={handleShowModal}>
                                <KTSVG
                                    path='/media/icons/duotune/arrows/arr075.svg'
                                    className='svg-icon-3x svg-icon-primary d-block my-2'
                                />
                                <a href='#' className='text-primary fw-bold fs-6'>
                                    Classified Exam
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ExamMain show={showModal} handleClose={handleCloseModal} />
            <AllConfedentialExams />
        </>
    );
};

export default ExamType;