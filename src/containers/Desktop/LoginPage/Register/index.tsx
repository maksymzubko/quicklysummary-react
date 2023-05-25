import React, {ChangeEvent, useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import authApi from "api/auth/auth.api";
import {setAuthorized, setUser} from "redux/store/user/slice";
import {linksDesktop} from "router";
import cl from "./style.module.css";
import LoginButton from "@components/Button/LoginButton";
import {SnackbarKey, useSnackbar} from "notistack";
import {messages} from "languages/messages";
import {useTranslation} from "react-i18next";

const RegisterPage = () => {
    const location = useLocation()
    const [email, setEmail] = useState(location.state?.email ?? "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registerLoading, setRegisterLoading] = useState(false)
    const navigate = useNavigate()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const { t } = useTranslation()
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value)
    }

    const handleChangePasswordConfirm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmPassword(event.target.value)
    }

    const register = () => {
        setRegisterLoading(true)
        authApi.register({email, password})
            .then((res) => {
                console.log('registered')
                setTimeout(() => {
                    navigate(linksDesktop.login, {state: {email}})
                }, 1500)
            })
            .catch(err => {
                console.log(err.response.data, err.response.data.message[0][0])
                const key:SnackbarKey = enqueueSnackbar(err.response.data.message[0][0], {variant: 'error'})
            })
            .finally(() => setRegisterLoading(false))
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.form}>
                <Typography className={cl.register}>{t(messages.login.register())}</Typography>
                <Box className={cl.fields}>
                    <TextField autoComplete={"none"} value={email} type={"email"} onChange={handleChangeEmail} className={cl.text_field}
                               placeholder={t(messages.login.email())} variant={'standard'}/>
                    <TextField autoComplete={"none"} value={password} type={"password"} onChange={handleChangePassword}
                               className={cl.text_field} placeholder={t(messages.login.password())} variant={'standard'}/>
                    <TextField autoComplete={"none"} value={confirmPassword} type={"password"} onChange={handleChangePasswordConfirm}
                               className={cl.text_field} placeholder={t(messages.login.c_password())} variant={'standard'}/>
                </Box>

                <LoginButton loading={registerLoading} onClick={register}>{t(messages.buttons.register())}</LoginButton>
            </Box>
        </Box>
    );
};

export default RegisterPage;