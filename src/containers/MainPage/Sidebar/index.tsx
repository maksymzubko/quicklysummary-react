import React from 'react';
import {Box, SvgIcon, Typography} from "@mui/material";
import cl from './style.module.css'
import {AlertType, DropzoneArea} from "react-mui-dropzone";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FilesListComponent from "./FilesListComponent";
import Icon from './assets/dropfile.svg'
import StatusesListComponent from "./StatusesListComponent";
import {FileTicket} from "./FileComponent";
import {StatusInterface} from "./StatusComponent";
import userApi from "../../../api/user/user.api";
import {SnackbarKey, useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {addStatus, addTicket, updateStatus} from "../../../redux/store/manager/slice";

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
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const dispatch = useDispatch()

    const onChangeFile = (e: File[]) => {
        if(e.length)
        {
            const form = new FormData();
            form.append('file', e[0]);
            const id = uuidv4();
            dispatch(addStatus({status: {id: id, name: e[0]?.name, status: "Uploading"}}))
            userApi.uploadFile(form).then(res=>{
                dispatch(addTicket({ticket: res}))
                dispatch(updateStatus({status: {id: id, name: e[0]?.name, status: "Done"}}))
            }).catch(err=>{
                onAlert(err?.response?.data?.message[0], "error")
                dispatch(updateStatus({status: {id: id, name: e[0]?.name, status: "Error"}}))
            })
        }
    }

    const onAlert = (message: string, variant: AlertType) => {
        //@ts-ignore
        const key:SnackbarKey = enqueueSnackbar(message, {variant: variant, onClick: () => closeSnackbar(key)})
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.drop_field}>
                <Typography className={cl.h1}>Drop your file here</Typography>
                <Typography className={cl.h2}>.txt .mp3 .mp4</Typography>
                <DropzoneArea
                    showAlerts={false}
                    onChange={onChangeFile}
                    onAlert={onAlert}
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
                <FilesListComponent onSelect={data.onSelectTicket} files={data.tickets}/>
            </Box>
            <Box className={cl.coins}>
                <Box className={cl.coins_text}>You have 0 coins</Box>
                <Box className={cl.coins_de}>Want more?<Box className={cl.upgrade}>Upgrade now</Box></Box>
            </Box>
            <Box className={cl.statuses}>
                <Box className={cl.header}>Actions</Box>
                <StatusesListComponent statuses={data.statuses}/>
            </Box>
        </Box>
    );
};

export default Sidebar;