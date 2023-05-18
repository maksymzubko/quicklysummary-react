import {Box, TextField, Typography} from "@mui/material";
import {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import cl from './style.module.css'
import AuthButton from "../../../components/Button/AuthButton";
import GoogleIcon from './assets/google_icon.svg'
import AppleIcon from './assets/apple_icon.svg'
import FacebookIcon from './assets/facebook_icon.svg'
import LoadContext from "../../../contexts/loadContext";
import authApi from "../../../api/auth/auth.api";
import {useNavigate} from "react-router-dom";
import {links} from "../../../router";
import {useTranslation} from "react-i18next";
import {messages} from "../../../languages/messages";

const AuthPage = () => {
    const [authLoading, setAuthLoading] = useState(false);
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const {t} = useTranslation()

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const googleAuth = () => {
        window.location.replace(`${process.env.VITE_API_QUICKLY}auth/google`)
    }

    const checkIsEmailExists = () => {
        setAuthLoading(true)

        authApi.emailExists(email)
            .then(()=>navigate(links.login, {state: {email}}))
            .catch(()=>navigate(links.register, {state: {email}}))
            .finally(()=>setAuthLoading(false))
    }

    const isEmail = useCallback(() => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = pattern.test(email);
        return isValid;
    }, [email])

    return (
        <Box className={cl.container}>
            <Box className={cl.form}>
                <Typography className={cl.login}>{t(messages.login.text1())}</Typography>
                <Typography className={cl.create_account}>{t(messages.login.text2())}</Typography>
                <Box className={cl.auth_buttons}>
                    <AuthButton onClick={googleAuth} icon_data={{icon:GoogleIcon}}>{t(messages.buttons.google())}</AuthButton>
                    <AuthButton onClick={()=>{}} icon_data={{icon:FacebookIcon}}>{t(messages.buttons.facebook())}</AuthButton>
                    <AuthButton onClick={()=>{}} icon_data={{icon:AppleIcon, needRevert: true}}>{t(messages.buttons.apple())}</AuthButton>
                </Box>
                <Typography className={cl.continue}>{t(messages.login.text3())}</Typography>
                <TextField value={email} onChange={handleChangeEmail} className={cl.text_field} sx={{font:"'Nunito Sans', sans-serif !important"}} placeholder={"name@example.com"} variant={'standard'}/>
                <AuthButton disabled={!isEmail()} loading={authLoading} onClick={checkIsEmailExists}>{t(messages.buttons.continue())}</AuthButton>
            </Box>
        </Box>
    );
};

export default AuthPage;