import React, {useEffect, useState} from 'react';
import {Box, SvgIcon} from "@mui/material";
import cl from './style.module.css'
import {HeaderMobileButton} from "@components/Button/HeaderButton";

export interface ICustomSelector {
    name: string,
    content: { id: any, name: string }[],
    onSelect: (id: any) => void,
    selected: any,
    opened: boolean,
}

const CustomSelector = (data: ICustomSelector) => {
    const [opened, setOpened] = useState(data.opened);
    const [selected, setSelected] = useState(data.selected)
    const handleSelect = (id: any) => {
        data.onSelect(id);
        setSelected(id)
    }

    useEffect(()=>{
        setOpened(data.opened)
    }, [data.opened])

    return (
        <Box onClick={() => setOpened(!opened)} className={[cl.container, opened ? cl.opened : ''].join(' ')}>
            {data.name}
            <svg className={cl.icon} width="20" height="20" viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.40027 6.93336C2.30326 7.03013 2.2263 7.14507 2.17378 7.27163C2.12127 7.39818 2.09424 7.53385 2.09424 7.67086C2.09424 7.80788 2.12127 7.94355 2.17378 8.0701C2.2263 8.19665 2.30326 8.3116 2.40027 8.40836L9.4086 15.4167C9.48569 15.4939 9.57727 15.5552 9.67808 15.5971C9.77889 15.6389 9.88696 15.6604 9.9961 15.6604C10.1052 15.6604 10.2133 15.6389 10.3141 15.5971C10.4149 15.5552 10.5065 15.4939 10.5836 15.4167L17.5919 8.40836C18.0003 8.00003 18.0003 7.3417 17.5919 6.93336C17.1836 6.52503 16.5253 6.52503 16.1169 6.93336L10.0003 13.05L3.87527 6.92503C3.46693 6.52503 2.8086 6.52503 2.40027 6.93336Z"
                    fill="#1A191D"/>
            </svg>
            <Box className={cl.content}>
                {data.content.map(d => <HeaderMobileButton selected={selected === d.id} style={{}}
                                                           onClick={() => handleSelect(d.id)}
                                                           key={d.id}>{d.name}</HeaderMobileButton>)}
            </Box>
        </Box>
    );
};

export default CustomSelector;