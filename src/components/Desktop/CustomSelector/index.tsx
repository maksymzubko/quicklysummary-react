import React, {useEffect, useRef, useState} from 'react';
import {Box, SvgIcon} from "@mui/material";
import cl from '@components/Desktop/CustomSelector/style.module.css'
import {Languages} from "api/user/types";
import IconBtn from "@components/IconButton";

export enum AnimationSides {
    left = "left",
    right = "right"
}

export interface SelectorData {
    data: Languages[];
    animationSide: AnimationSides;
    onChangeValue: (lang: Languages) => void;
    theme?: "white" | "black";
    initialValue?: Languages;
}

const CustomSelector = (data: SelectorData) => {
    const [selected, setSelected] = useState(data.initialValue ?? data.data[0])
    const [opened, setOpened] = useState(false)
    const ref = useRef<HTMLDivElement>()

    const select = (newContent: Languages) => {
        setSelected(newContent)
        setOpened(false)
        data.onChangeValue(newContent);
    }

    useEffect(() => {
        setTimeout(() => {
            if(ref.current)
                ref.current.setAttribute("data-dont-animate", "0")
        }, 500)
    }, [])

    return (
        <Box ref={ref} data-dont-animate={1}
             className={[cl.select, opened ? cl.show_list : cl.hide_list, cl[data.animationSide], data.theme ? cl[data.theme] : cl.white].join(' ')}>
            <Box className={cl.others_content}>
                {['x', ...data.data
                    .filter(c => c !== selected)]
                    .map(c => {
                            if (c !== 'x')
                                return <Box key={c} onClick={() => select(Languages[c as Languages])}
                                            className={cl.content}>{c}</Box>
                            else
                                return <IconBtn key={c} onClick={() => setOpened(false)} className={cl.content}>
                                    <SvgIcon viewBox={"0 0 32 32"}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="none"/>
                                            <path
                                                d="M11.6317 20.3692L16.0008 16L20.37 20.3692M20.37 11.6309L16 16L11.6317 11.6309"
                                                stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                        </svg>
                                    </SvgIcon>
                                </IconBtn>
                        }
                    )}
            </Box>
            <Box onClick={() => {
                setOpened(true)
            }} className={cl.current_content}>{selected}</Box>
        </Box>
    );
};

export default CustomSelector;