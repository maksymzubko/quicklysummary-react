import React, {useEffect, useState} from 'react';
import cl from './style.module.css'
import {Box, ClickAwayListener, SvgIcon, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {messages} from "../../languages/messages";
import IconBtn from "../IconButton";

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
    const {t} = useTranslation()

    useEffect(() => {

        let draggableElement = document.querySelector(`.${cl.content}`) as HTMLElement;
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        var initialX = 0;
        var initialY = 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        draggableElement.addEventListener("mousedown", function (event) {
            isDragging = true;
            var rect = draggableElement.getBoundingClientRect();
            offsetX = event.clientX - rect.left - rect.width * 0.5;
            offsetY = event.clientY - rect.top - rect.height * 0.5;
            initialX = draggableElement.offsetLeft;
            initialY = draggableElement.offsetTop;
        });

        document.addEventListener("mousemove", function (event) {
            if (isDragging) {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;

                var posX = event.clientX - offsetX * .5 - 24;
                var posY = event.clientY - offsetY * .5 - 24;

                // Calculate the maximum allowed position considering the screen boundaries
                var maxX = window.innerWidth - draggableElement.offsetWidth * .5;
                var maxY = window.innerHeight - draggableElement.offsetHeight * .5;

                // Clamp the position within the screen boundaries
                posX = Math.max(0, Math.min(posX, maxX));
                posY = Math.max(0, Math.min(posY, maxY));

                draggableElement.style.left = posX + "px";
                draggableElement.style.top = posY + "px";
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
        });

        setTimeout(() => {
            document.querySelector(`.${cl.content}`).setAttribute("data-dont-animate", "0");
        }, 500)
    }, [])

    useEffect(() => {
        if (data.opened)
        {
            let draggableElement = document.querySelector(`.${cl.content}`) as HTMLElement;
            draggableElement.style.left = "50%";
            draggableElement.style.top = "50%";
            setTimeout(() => {
                setCanClose(true)
            }, 1000)
        }
        else {
            setTimeout(() => {
                setCanClose(false)
            }, 500)
        }
    }, [data.opened])

    const onClose = () => {
        if (canClose)
            data.onClose()
    }

    return (
        <Box data-dont-animate={"1"} className={[cl.content, data.opened ? cl.show : cl.hide].join(" ")}>
            <IconBtn onClick={onClose} className={cl.exit}>
                <SvgIcon viewBox={"0 0 32 32"}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="none"/>
                        <path d="M11.6317 20.3692L16.0008 16L20.37 20.3692M20.37 11.6309L16 16L11.6317 11.6309"
                              stroke="#1A191D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </SvgIcon>
            </IconBtn>
            <Typography className={cl.header}>{t(messages.main.custom())}</Typography>
            <TextField value={data.value} onChange={(e) => data.onChange(e.target.value)}
                       placeholder={t(messages.main.e_prompt())}
                       multiline={true} maxRows={5} variant={"standard"}></TextField>
        </Box>
    );
};

export default CustomPrompt;