import React, { useState, useEffect } from 'react';
import { RecommendationProps } from '../models/models';

const Recommendation: React.FC<RecommendationProps> = (props) => {
    const [recommendation, setRecommendation] = useState<string | null>(null);

    useEffect(() => {
        const recommendation = generateRecommendation(props.accuracyPercentage, props.difficulty, props.attempted, props.correct, props.incorrect, props.unattempted);
        setRecommendation(recommendation);
    }, [props]);

    function determineGrade(accuracyPercentage: number, difficulty: string): string {
        if (difficulty === 'easy') {
            if (accuracyPercentage >= 60) return 'A+';
            else if (accuracyPercentage >= 50) return 'A';
            else if (accuracyPercentage >= 40) return 'B+';
            else if (accuracyPercentage >= 30) return 'B';
            else if (accuracyPercentage >= 20) return 'C+';
            else if (accuracyPercentage >= 10) return 'C';
            else return 'F';
        } else if (difficulty === 'medium') {
            if (accuracyPercentage >= 70) return 'A+';
            else if (accuracyPercentage >= 60) return 'A';
            else if (accuracyPercentage >= 50) return 'B+';
            else if (accuracyPercentage >= 40) return 'B';
            else if (accuracyPercentage >= 30) return 'C+';
            else if (accuracyPercentage >= 20) return 'C';
            else return 'F';
        } else if (difficulty === 'hard') {
            if (accuracyPercentage >= 80) return 'A+';
            else if (accuracyPercentage >= 70) return 'A';
            else if (accuracyPercentage >= 60) return 'B+';
            else if (accuracyPercentage >= 50) return 'B';
            else if (accuracyPercentage >= 40) return 'C+';
            else if (accuracyPercentage >= 30) return 'C';
            else return 'F';
        } else if (difficulty === 'expert') {
            if (accuracyPercentage >= 90) return 'A+';
            else if (accuracyPercentage >= 80) return 'A';
            else if (accuracyPercentage >= 70) return 'B+';
            else if (accuracyPercentage >= 60) return 'B';
            else if (accuracyPercentage >= 50) return 'C+';
            else if (accuracyPercentage >= 40) return 'C';
            else return 'F';
        }

        return 'F';
    }

    function generateRecommendation(accuracyPercentage: number, difficulty: string, attempted: number, correct: number, incorrect: number, unattempted: number): string {
        const grade = determineGrade(accuracyPercentage, difficulty);
        let accuracyColor = '';

        // Determine color based on grade
        switch (grade) {
            case 'A+':
                accuracyColor = 'green';
                break;
            case 'A':
                accuracyColor = 'green';
                break;
            case 'B+':
                accuracyColor = 'blue';
                break;
            case 'B':
                accuracyColor = 'blue';
                break;
            case 'C+':
                accuracyColor = 'orange';
                break;
            case 'C':
                accuracyColor = 'orange';
                break;
            default:
                accuracyColor = 'red';
                break;
        }

        const overallSummary = `<h4 style='color:white'>Overall Performance Summary:</h4>
        <ul>
            <li>You attempted ${attempted} out of ${attempted + unattempted} questions, achieving an overall accuracy of <span style="color: ${accuracyColor}; font-weight: bold;">${accuracyPercentage}%</span>.</li>
            <li>Your performance shows a good understanding of the subject matter with room for improvement.</li>
        </ul>`;

        let strengths = `<h4 style='color:white'>Strengths:</h4>`;
        if (attempted > 0) {
            strengths += `<ul>
                <li>You correctly answered ${correct} out of ${attempted} attempted questions, indicating strong knowledge in those areas.</li>
                <li>Your accuracy in the attempted questions is commendable.</li>
            </ul>`;
        } else {
            strengths += `<p>No questions were attempted.</p>`;
        }

        let areasForImprovement = `<h4 style='color:white'>Areas for Improvement:</h4>`;
        if (unattempted > 0) {
            areasForImprovement += `<ul>
                <li>You missed ${unattempted} questions, which highlights areas that need further review.</li>
                <li>Focus on attempting more questions to improve your overall score.</li>
            </ul>`;
        } else if (attempted > 0 && incorrect === attempted) {
            areasForImprovement += `<p>All attempted questions were answered incorrectly. Review the topics covered in the exam.</p>`;
        } else {
            areasForImprovement += `<p>All attempted questions were answered correctly. Consider tackling more challenging topics.</p>`;
        }

        const gradeAnalysis = `<h4 style='color:white'>Grade Analysis:</h4>
        <ul>
            <li>For an ${difficulty}-level exam, your score of <span style="color: ${accuracyColor}; font-weight: bold;">${accuracyPercentage}%</span> qualifies for an ${grade} grade.</li>
            <li>To achieve higher grades in medium, hard, or expert level exams, aim to increase your accuracy to meet the respective thresholds.</li>
        </ul>`;

        const recommendations = `<h4 style='color:white'>Recommendations for Future Exams:</h4>
        <ul>
            <li>Review the topics of the questions you got wrong or didn't attempt to strengthen your knowledge.</li>
            <li>Practice more questions of varying difficulty levels to improve your overall performance.</li>
            <li>Consider time management strategies to ensure you can attempt all questions in the exam.</li>
        </ul>`;

        const recommendation = `${overallSummary}<br>${strengths}<br>${areasForImprovement}<br>${gradeAnalysis}<br>${recommendations}`;

        return recommendation;
    }

    return (
        <div className="text-light">
            {recommendation && <div dangerouslySetInnerHTML={{ __html: recommendation }} />}
        </div>
    );
};

export default Recommendation;
