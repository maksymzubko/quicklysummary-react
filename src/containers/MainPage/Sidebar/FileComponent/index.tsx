import React, {useCallback, useEffect, useState} from 'react';
import {Box, IconButton} from "@mui/material";
import cl from './style.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

export interface FileTicket {
    ticketId: number;
    ticketName: string;
}

export interface FileInterface {
    ticket: FileTicket;
    onSelect: (id: number) => void;
    onDelete: () => void;
    isSelected: boolean;
}

const FileComponent = (data: FileInterface) => {
    const [deleteStage, setDeleteStage] = useState(0)

    useEffect(() => {
        if (!data.isSelected) {
            setDeleteStage(0)
        }
    }, [data.isSelected])

    const handleClick = () => {
        if (data.isSelected) {
            setDeleteStage(deleteStage > 0 ? 0 : 1)
        } else
            data.onSelect(data.ticket.ticketId);
    }

    const dataStyle = useCallback(() => {
        if (deleteStage === 1) {
            const obj = document.getElementsByClassName(cl.container)[0] as HTMLElement
            const position = obj.getBoundingClientRect();
            return {top: position.top, left: position.left + Math.round(obj.offsetWidth * 0.75)}
        }
    }, [deleteStage])

    return (
        <Box onClick={handleClick} className={[cl.container, data.isSelected ? cl.selected : ''].join(' ')}>
            {deleteStage === 1 &&
                <Box sx={dataStyle} className={cl.icons}>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            }
            <Box className={cl.content}>
                {data.ticket.ticketName}
            </Box>
        </Box>
    );
};

export default FileComponent;