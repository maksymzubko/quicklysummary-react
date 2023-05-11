import React from 'react';
import {Box, LinearProgress} from "@mui/material";
import {makeStyles} from '@mui/styles'
import cl from './style.module.css'

export interface StatusInterface {
    id: number;
    name: string;
    status: "Uploading" | "Done" | "In process";
}

const useStyles = makeStyles({
    root: {
        height: 4,
        borderRadius: 5,
        background: "#C7C7C7"
    },
    bar: ({status}: {status: "Done" | "In process" | "Uploading"}) => ({
        borderRadius: 5,
        background: status !== 'Done' ? "linear-gradient(75deg, #A18CD1 9.18%, #FBC2EB 90.82%)" : " linear-gradient(240deg, #7AFF9C 18.52%, #14C259 86.6%)"
    })
});

const Progress = ({ value, status }: {value: number,status: "Uploading" | "Done" | "In process"}) =>  {
    const classes = useStyles({ status });

    return (
        <LinearProgress
            classes={{ root: classes.root, bar: classes.bar }}
            variant={status !== 'Done' ? "indeterminate" : "buffer"}
            valueBuffer={value}
            value={value}
        />
    );
}


const StatusComponent = (data: StatusInterface) => {
    return (
        <Box className={cl.container}>
            <Box className={cl.status}>{data.status}</Box>
            <Box className={cl.content}>{data.name}</Box>
            <Box className={cl.progress}>
                <Progress value={data.status === 'Done' ? 100 : 0} status={data.status}/>
            </Box>
        </Box>
    );
};

export default StatusComponent;