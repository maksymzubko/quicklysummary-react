import React, {useEffect, useState} from 'react';
import cl from './style.module.css'
import {Box, ClickAwayListener, TextField, Typography} from "@mui/material";

export interface CustomPromptInterface {
    opened: boolean;
    onClose: () => void;
    onChange: (value: string) => void;
    value: string;
}

const CustomPrompt = (data: CustomPromptInterface) => {
    const [canClose, setCanClose] = useState(false)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(`.${cl.container}`).setAttribute("data-dont-animate", "0");
        }, 500)
    }, [])

    useEffect(() => {
        if(data.opened)
            setTimeout(() => {
                setCanClose(true)
            }, 1000)
        else{
            setTimeout(() => {
                setCanClose(false)
            }, 500)
        }
    }, [data.opened])

    const onClose = () => {
        if(canClose)
            data.onClose()
    }

    return (
        <Box data-dont-animate={"1"} className={[cl.container, data.opened ? cl.show : cl.hide].join(" ")}>
            <ClickAwayListener onClickAway={onClose}>
                <Box className={cl.content}>
                    <Typography className={cl.header}>Custom prompt</Typography>
                    <TextField value={data.value} onChange={(e)=>data.onChange(e.target.value)} placeholder={"Enter your prompt"}
                               multiline={true} maxRows={5} variant={"standard"}></TextField>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default CustomPrompt;