import React from 'react';
import { QuestionModel } from '../models/models';


const Question: React.FC<{ questionData: QuestionModel }> = ({ questionData }) => {
    return (
        <div>
            <h1>{questionData.title}</h1>
            <p>{questionData.description && <div dangerouslySetInnerHTML={{ __html: questionData.description }} />}</p>
        </div>
    );
};


export default Question;