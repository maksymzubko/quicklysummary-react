import React, {useCallback, useEffect, useState} from 'react';
import cl from './style.module.css'
import {
    Box,
    Checkbox, CheckboxProps,
    ClickAwayListener,
    FormControlLabel,
    FormGroup, LinearProgress,
    styled, SvgIcon,
    TextField,
    Typography
} from "@mui/material";
import HeaderButton from "@components/Button/HeaderButton";
import ContactButton from "@components/Button/ContactButton";
import {useTranslation} from "react-i18next";
import {messages} from "languages/messages";

export interface ContactUsInterface {
    opened: boolean;
    onClose: () => void;
}

const NonChecked = () => {
    return <SvgIcon sx={{width: "20px", height: "20px"}} viewBox={"0 0 20 20"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="none" stroke="#1A191D"/>
        </svg>
    </SvgIcon>
}

const Checked = () => {
    return <SvgIcon sx={{width: "20px", height: "20px"}} viewBox={"0 0 20 20"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="none" stroke="#1A191D"/>
            <mask id="mask0_517_1302" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="4" y="4" width="12"
                  height="12">
                <rect x="4" y="4" width="12" height="12" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_517_1302)">
                <path
                    d="M8.77502 12.7872C8.70835 12.7872 8.64585 12.7768 8.58752 12.756C8.52918 12.7351 8.47502 12.6997 8.42502 12.6497L6.27502 10.4997C6.18335 10.408 6.1396 10.2893 6.14377 10.1435C6.14793 9.99762 6.19585 9.87887 6.28752 9.78721C6.37918 9.69554 6.49585 9.64971 6.63752 9.64971C6.77918 9.64971 6.89585 9.69554 6.98752 9.78721L8.77502 11.5747L13.0125 7.33721C13.1042 7.24554 13.2229 7.19971 13.3688 7.19971C13.5146 7.19971 13.6333 7.24554 13.725 7.33721C13.8167 7.42887 13.8625 7.54762 13.8625 7.69346C13.8625 7.83929 13.8167 7.95804 13.725 8.04971L9.12502 12.6497C9.07502 12.6997 9.02085 12.7351 8.96252 12.756C8.90418 12.7768 8.84168 12.7872 8.77502 12.7872Z"
                    fill="#1C1B1F"/>
            </g>
        </svg>
    </SvgIcon>
}

const ContactUs = (data: ContactUsInterface) => {
    const [canClose, setCanClose] = useState(false)
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [isAllowed, setIsAllowed] = useState(false)
    const {t} = useTranslation()

    //@ts-ignore
    const handleChangeName = (event: any) => {
        setName(event.target.value)
    }

    //@ts-ignore
    const handleChangeMessage = (event: any) => {
        setMessage(event.target.value)
    }

    //@ts-ignore
    const handleChangeIsAllowed = (event: any) => {
        setIsAllowed(event.target.checked)
    }

    const isDisabled = useCallback(() => {
        return !name || !message || !isAllowed
    }, [name, message, isAllowed])

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

        setName("")
        setMessage("")
        setIsAllowed(false)
    }, [data.opened])

    const onClose = () => {
        if(canClose)
            data.onClose()
    }

    return (
        <Box id={"help"} data-dont-animate={"1"} className={[cl.container, data.opened ? cl.show : cl.hide].join(" ")}>
            <ClickAwayListener onClickAway={onClose}>
                <Box className={cl.content}>
                    <Box className={cl.header}>
                        <Typography className={cl.contact_us}>{t(messages.contactUs.contactUs())}</Typography>
                        <Typography className={cl.fill}>{t(messages.contactUs.fields())}</Typography>
                    </Box>

                    <Box className={cl.inputs}>
                        <TextField placeholder={t(messages.contactUs.name())} variant={'standard'} onChange={handleChangeName} value={name}/>
                        <TextField multiline={true} maxRows={5} sx={{"&": {scrollbarWidth: "thin"}}}
                                   placeholder={t(messages.contactUs.message())} variant={'standard'} onChange={handleChangeMessage}
                                   value={message}/>
                        <FormGroup sx={{width: "100%"}}>
                            <FormControlLabel
                                control={<Checkbox icon={<NonChecked/>} checkedIcon={<Checked/>} checked={isAllowed}
                                                   onChange={handleChangeIsAllowed}/>}
                                label={t(messages.contactUs.allowData())}/>
                        </FormGroup>
                    </Box>

                    <ContactButton disabled={isDisabled()} onClick={data.onClose}>{t(messages.buttons.send())}</ContactButton>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default ContactUs;