import React from 'react';
import {Box, SvgIcon, Typography} from "@mui/material";
import cl from './style.module.css'
import {DropzoneArea} from "react-mui-dropzone";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FilesListComponent from "./FilesListComponent";
import Icon from './assets/dropfile.svg'
import StatusesListComponent from "./StatusesListComponent";
import {FileTicket} from "./FileComponent";
import {StatusInterface} from "./StatusComponent";

export interface SidebarProps {
    tickets: FileTicket[]
    onSelectTicket: (id: number) => void;
    statuses: StatusInterface[]
}

const DropIcon = () => {
    return (
        <svg viewBox={"0 0 278 142"} width={"100%"} height={"100%"}>
            <image href={Icon}/>
        </svg>
    )
}

const Sidebar = (data: SidebarProps) => {
    return (
        <Box className={cl.container}>
            <Box className={cl.drop_field}>
                <Typography className={cl.h1}>Drop your file here</Typography>
                <Typography className={cl.h2}>.txt .mp3 .mp4</Typography>
                <DropzoneArea
                    dropzoneText={""}
                    acceptedFiles={['.txt', '.mp3', '.mp4']}
                    filesLimit={1}
                    maxFileSize={50000}
                    Icon={DropIcon}
                    classes={{text: cl.text, root: cl.drop_field_root, textContainer: cl.text_container}}
                />
            </Box>
            <Box className={cl.files}>
                <Box className={cl.header}>Uploaded files</Box>
                <FilesListComponent onSelect={data.onSelectTicket} files={[]}/>
            </Box>
            <Box className={cl.coins}>
                <Box className={cl.coins_text}>You have 95 coins</Box>
                <Box className={cl.coins_de}>Want more?<Box className={cl.upgrade}>Upgrade now</Box></Box>
            </Box>
            <Box className={cl.statuses}>
                <Box className={cl.header}>Actions</Box>
                <StatusesListComponent statuses={[]}/>
            </Box>
        </Box>
    );
};

export default Sidebar;