import React, { useState, useEffect } from 'react';
import { PageLink, PageTitle } from '../../theme/layout/core';
import ExamType from './components/ExamType';
import QuickExam from './components/QuickExam';

interface ExamPageProps { }

interface ExamPageState {
    currentPath: string;
    startExam: boolean;
    pageTitle: string;
    componentToRender: JSX.Element | null;
}

const profileBreadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        isSeparator: false,
        isActive: false,
    },
];

const ExamPage: React.FC<ExamPageProps> = () => {
    const [examPageState, setExamPageState] = useState<ExamPageState>({
        currentPath: window.location.pathname,
        startExam: false,
        pageTitle: 'Exam Builder',
        componentToRender: null,
    });

    useEffect(() => {
        updateComponent();
    }, [examPageState.currentPath]);

    const updateComponent = () => {
        const { currentPath } = examPageState;
        switch (currentPath) {
            case '/exam-attemption':
                setExamPageState({
                    ...examPageState,
                    pageTitle: 'Exam Builder',
                    componentToRender: <ExamType />,
                    startExam: false,
                });
                break;
            case '/exam-attemption/quick-exam':
                setExamPageState({
                    ...examPageState,
                    pageTitle: 'Exam Builder',
                    componentToRender: <QuickExam />,
                    startExam: true,
                });
                break;
            default:
                setExamPageState({
                    ...examPageState,
                    pageTitle: 'Unknown',
                    componentToRender: null,
                    startExam: false,
                });
                break;
        }
    };

    const { startExam, pageTitle, componentToRender } = examPageState;

    return (
        <>
            {startExam ? null : <PageTitle breadcrumbs={profileBreadCrumbs}>{pageTitle}</PageTitle>}
            {componentToRender}
        </>
    );
};

export default ExamPage;
