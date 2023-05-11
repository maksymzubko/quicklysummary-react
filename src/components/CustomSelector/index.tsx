import  {useState} from 'react';
import {Box} from "@mui/material";
import cl from './style.module.css'
import X from "../Header/assets/x.svg";

export enum AnimationSides {
    left="left",
    right="right"
}

export interface SelectorData {
    data: string[];
    animationSide: AnimationSides;
    onChangeValue: () => void;
    theme?: "white" | "black";
}

const CustomSelector = (data: SelectorData) => {
    const [selected, setSelected] = useState(data.data[0])
    const [opened, setOpened] = useState(false)

    const select = (newContent: string) => {
        setSelected(newContent)
        setOpened(false)
    }

    return (
        <Box className={[cl.select, opened ? cl.show_list : cl.hide_list, cl[data.animationSide], data.theme ? cl[data.theme] : cl.white].join(' ')}>
            <Box className={cl.others_content}>
                {['x', ...data.data
                    .filter(c => c !== selected)]
                    .map(c =>
                        {
                            if(c!=='x')
                                return <Box key={c} onClick={() => select(c)} className={cl.content}>{c}</Box>
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