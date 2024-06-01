import React from 'react';
import DOMPurify from 'dompurify';
import { QuestionModel } from '../models/models';


const Question: React.FC<{ questionData: QuestionModel }> = ({ questionData }) => {
    const sanitizedDescription = DOMPurify.sanitize(questionData.description);
    return (
        <div>
            <h1>{questionData.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
    );
};


export default Question;