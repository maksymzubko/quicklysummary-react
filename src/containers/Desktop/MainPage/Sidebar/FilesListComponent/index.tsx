import React, {useState} from 'react';
import {Box, Skeleton} from "@mui/material";
import cl from './style.module.css'
import FileComponent, {FileInterface, FileTicket} from "../FileComponent";
import {Scrollbars} from 'react-custom-scrollbars';

export interface FileListInterface {
    files: FileTicket[]
    onSelect: (id: number) => void;
}

const FilesListComponent = (data: FileListInterface) => {
    const [selected, setSelected] = useState(null)

    const onSelect = (id: number) => {
        setSelected(id)
        data.onSelect(id)
    }

    return (
        <Box className={cl.container}>
            <Scrollbars autoHideDuration={1000} width={"100%"} autoHide={true}>
                <Box className={cl.content}>
                    {data.files.length === 0 &&
                        <>
                            <Skeleton animation={false} variant={"rounded"} width={"100%"} sx={{opacity: ".3"}}
                                      height={"36px"}/>
                            <Skeleton animation={false} variant={"rounded"} width={"100%"} sx={{opacity: ".2"}}
                                      height={"36px"}/>
                            <Skeleton animation={false} variant={"rounded"} width={"100%"} sx={{opacity: ".1"}}
                                      height={"36px"}/>
                        </>
                    }
                    {data.files.map(f => <FileComponent onDelete={() => {
                    }} isSelected={selected === f.ticketId} onSelect={onSelect} key={f.ticketId}
                                                        ticket={f}></FileComponent>)}
                </Box>
            </Scrollbars>
        </Box>
    );
};

export default FilesListComponent;