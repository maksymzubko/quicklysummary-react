import {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import cl from './style.module.css'
import X from "../Header/assets/x.svg";
import {Languages} from "../../api/user/types";

export enum AnimationSides {
    left="left",
    right="right"
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

    const select = (newContent: Languages) => {
        setSelected(newContent)
        setOpened(false)
        data.onChangeValue(newContent);
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(`.${cl.select}`).setAttribute("data-dont-animate", "0");
        }, 500)
    }, [])

    return (
        <Box data-dont-animate={1} className={[cl.select, opened ? cl.show_list : cl.hide_list, cl[data.animationSide], data.theme ? cl[data.theme] : cl.white].join(' ')}>
            <Box className={cl.others_content}>
                {['x', ...data.data
                    .filter(c => c !== selected)]
                    .map(c =>
                        {
                            if(c!=='x')
                                return <Box key={c} onClick={() => select(Languages[c as Languages])} className={cl.content}>{c}</Box>
                            else
                                return <Box key={c} onClick={() => setOpened(false)}><img src={X} alt={'x'}/></Box>
                        }
                    )}
            </Box>
            <Box onClick={() => {setOpened(true)}} className={cl.current_content}>{selected}</Box>
        </Box>
    );
};

export default CustomSelector;