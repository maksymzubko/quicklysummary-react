import React from 'react';
import {Box, LinearProgress} from "@mui/material";
import {makeStyles} from '@mui/styles'
import cl from './style.module.css'
import {messages} from "languages/messages";
import {useTranslation} from "react-i18next";

export interface StatusInterface {
    id: number | string;
    name: string;
    status: status;
}

type status = "Uploading" | "Done" | "In process" | "Error";

const getGradient = (status: status) => {
    if(status === "Done")
        return "linear-gradient(75deg, #A18CD1 9.18%, #FBC2EB 90.82%)"
    if(status === "Error")
        return "linear-gradient(75deg, rgba(223,118,93,1) 9.18%, rgba(221,58,58,1) 90.82%)"
    else return "linear-gradient(240deg, #7AFF9C 18.52%, #14C259 86.6%)";
}

const getVariant = (status: status) => {
    if(status === 'Done' || status === 'Error')
        return "buffer"
    else return "indeterminate"
}

const getValue = (status: status) => {
    if(status === 'Done' || status === 'Error')
        return 100
    else return 0
}

const useStyles = makeStyles({
    root: {
        height: 4,
        borderRadius: 5,
        background: "#C7C7C7"
    },
    bar: ({status}: {status: status}) => ({
        borderRadius: 5,
        background: getGradient(status)
    })
});

const Progress = ({ value, status }: {value: number,status: status}) =>  {
    const classes = useStyles({ status });

    return (
        <LinearProgress
            classes={{ root: classes.root, bar: classes.bar }}
            variant={getVariant(status)}
            valueBuffer={value}
            value={value}
        />
    );
}


const StatusComponent = (data: StatusInterface) => {
    const {t} = useTranslation()
    return (
        <Box className={cl.container}>
            <Box className={cl.status}>{data.status === 'Uploading' ? t(messages.actions.upload_t()) : data.status}</Box>
            <Box className={cl.content}>{data.name}</Box>
            <Box className={cl.progress}>
                <Progress value={getValue(data.status)} status={data.status}/>
            </Box>
        </Box>
    );
};

export default StatusComponent;