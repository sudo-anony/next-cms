import React from 'react';
import { Answer, PossibleAnswer } from '../models/models';
import { Avatar, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PAnswer: React.FC<{
    possibleAnswer: PossibleAnswer,
    index: number,
    isSelected: boolean,
    onSelect: () => void,
    status?: string,
    submittedAnswer?: Answer
}> = ({ possibleAnswer, index, isSelected, onSelect, status, submittedAnswer }) => {
    const avatarLabel = alphabet[index];
    const isReview = status === 'review';
    const isSubmitted = submittedAnswer?.possible_answer_id === possibleAnswer.id;
    const isCorrect = possibleAnswer.correct;

    const chipStyles = {
        width: "50%",
        margin: "15px",
        fontSize: "15px",
        padding: "20px 0px",
        color: "white",
        justifyContent: "start",
        border: '1px solid',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
    };

    const avatarStyles = (backgroundColor: string) => ({
        fontSize: "20px",
        width: 40,
        overflow: "hidden",
        height: 40,
        marginLeft: 0,
        borderRadius: "10px 0px 0px 10px",
        backgroundColor: backgroundColor,
        color: 'black',
    });

    const getChipElement = (backgroundColor: string, borderColor: string, icon?: JSX.Element, clickable = true) => (
        <Chip
            avatar={<Avatar style={avatarStyles(backgroundColor)}>{avatarLabel}</Avatar>}
            sx={{
                ...chipStyles,
                borderColor: borderColor,
                cursor: clickable ? 'pointer' : 'default',
            }}
            icon={icon}
            label={< span dangerouslySetInnerHTML={{ __html: possibleAnswer.content }
            } />}
            onClick={clickable ? onSelect : undefined}
        />
    );

    if (isReview) {
        if (isCorrect) {
            return getChipElement('#2e7d32', '#2e7d32', <CheckIcon style={{ color: '#fff' }} />, false);
        }
        if (isSubmitted && !submittedAnswer?.correct) {
            return getChipElement('#ae3905', '#ae3905', <CheckIcon style={{ color: '#fff' }} />, false);
        }
        return getChipElement('white', 'white', undefined, false);
    }

    if (isSubmitted) {
        if (submittedAnswer?.correct) {
            return getChipElement('#2e7d32', '#2e7d32', <CheckIcon style={{ color: '#fff' }} />, false);
        } else {
            return getChipElement('#ae3905', '#ae3905', <CheckIcon style={{ color: '#fff' }} />, false);
        }
    }

    return getChipElement(isSelected ? '#1976d2' : 'white', isSelected ? '#1976d2' : 'white');
};

export default PAnswer;
