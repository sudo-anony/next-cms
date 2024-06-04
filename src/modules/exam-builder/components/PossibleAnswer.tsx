import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { PossibleAnswer } from '../models/models';
import { Avatar, Chip } from '@mui/material';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import CheckIcon from '@mui/icons-material/Check';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PAnswer: React.FC<{
    possibleAnswer: PossibleAnswer,
    index: number,
    isSelected: boolean,
    onSelect: () => void,
    status?: string
}> = ({ possibleAnswer, index, isSelected, onSelect, status }) => {
    const [model, setModel] = useState("Example Set");
    const sanitizedContent = DOMPurify.sanitize(possibleAnswer.content);

    const handleModelChange = (event: any) => {
        setModel(event);
    };

    const avatarLabel = alphabet[index];

    const defaultChipElement = (
        <Chip
            avatar={
                <Avatar style={{
                    fontSize: "20px",
                    width: 40,
                    overflow: "hidden",
                    height: 40,
                    marginLeft: 0,
                    borderRadius: "10px 0px 0px 10px",
                    backgroundColor: isSelected ? '#1976d2' : "white",
                    color: 'black'
                }}>
                    {avatarLabel}
                </Avatar>
            }
            sx={{
                width: "50%",
                margin: "15px",
                fontSize: "15px",
                padding: "20px 0px",
                color: "white",
                justifyContent: "start",
                border: isSelected ? '1px solid #1976d2' : '1px solid white',
                boxShadow: isSelected ? '0 4px 8px rgba(25, 118, 210, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                    boxShadow: isSelected ? '0 4px 8px rgba(25, 118, 210, 0.6)' : '0 4px 8px rgba(0, 0, 0, 0.4)',
                }
            }}
            label={<span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />}
            onClick={onSelect}
        />
    );

    const reviewChipElement = (

        <Chip
            avatar={
                <Avatar style={{
                    fontSize: "20px",
                    width: 40,
                    overflow: "hidden",
                    height: 40,
                    marginLeft: 0,
                    borderRadius: "10px 0px 0px 10px",
                    backgroundColor: '#2e7d32',
                    color: 'black'
                }}>
                    {avatarLabel}
                </Avatar>
            }
            sx={{
                width: "50%",
                margin: "15px",
                fontSize: "15px",
                padding: "20px 0px",
                color: "white",
                justifyContent: "start",
                border: '1px solid #2e7d32',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                }
            }}
            icon={
                <span style={{ backgroundColor: '#2e7d32', padding: '8px', borderRadius: '50%' }}>
                    <CheckIcon style={{ color: '#fff' }} />
                </span>
            }
            label={<span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />}
            onClick={onSelect}
        />
    );

    if (status === 'review' && possibleAnswer.correct) {
        return reviewChipElement;
    } else {
        return defaultChipElement;
    }
};

export default PAnswer;
