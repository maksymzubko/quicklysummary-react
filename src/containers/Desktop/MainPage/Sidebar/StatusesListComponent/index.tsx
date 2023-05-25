import React from 'react';
import {Box, Skeleton} from "@mui/material";
import cl from "./style.module.css";
import StatusComponent, {StatusInterface} from "../StatusComponent";
import {Scrollbars} from "react-custom-scrollbars";

export interface StatusesListInterface {
    statuses: StatusInterface[]
}

const StatusesListComponent = (data: StatusesListInterface) => {
    return (
        <Box className={cl.container}>
            <Scrollbars autoHideDuration={1000} width={"100%"} autoHide={true}>
                <Box className={cl.content}>
                    {data.statuses.length === 0 &&
                        <>
                            <Skeleton animation={false} sx={{opacity: ".3"}} variant={"rounded"} height={"48px"}/>
                            <Skeleton animation={false} sx={{opacity: ".2"}} variant={"rounded"} height={"48px"}/>
                            <Skeleton animation={false} sx={{opacity: ".1"}} variant={"rounded"} height={"48px"}/>
                        </>
                    }
                    {data.statuses.map(f => <StatusComponent key={f.id} {...f}></StatusComponent>)}
                </Box>
            </Scrollbars>
        </Box>
    );
};

export default StatusesListComponent;