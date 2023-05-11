import React from 'react';
import {Box, Skeleton} from "@mui/material";
import cl from "./style.module.css";
import StatusComponent, {StatusInterface} from "../StatusComponent";

export interface StatusesListInterface {
    statuses: StatusInterface[]
}



const StatusesListComponent = (data: StatusesListInterface) => {
    return (
        <Box className={cl.container}>
            {data.statuses.length === 0 &&
            <>
                <Skeleton animation={false} sx={{opacity:".3"}} variant={"rounded"} height={"48px"}/>
                <Skeleton animation={false} sx={{opacity:".2"}} variant={"rounded"} height={"48px"}/>
                <Skeleton animation={false} sx={{opacity:".1"}} variant={"rounded"} height={"48px"}/>
            </>
            }
            {data.statuses.map(f=><StatusComponent key={f.id} {...f}></StatusComponent>)}
        </Box>
    );
};

export default StatusesListComponent;