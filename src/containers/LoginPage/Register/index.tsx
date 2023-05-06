import React, {ChangeEvent, useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import authApi from "../../../api/auth/auth.api";
import {setAuthorized, setUser} from "../../../redux/store/user/slice";
import {links} from "../../../router";
import cl from "./style.module.css";
import LoginButton from "../../../components/Button/LoginButton";
import {SnackbarKey, useSnackbar} from "notistack";

const RegisterPage = () => {
    const location = useLocation()
    const [email, setEmail] = useState(location.state?.email ?? "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registerLoading, setRegisterLoading] = useState(false)
    const navigate = useNavigate()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
                    navigate(links.login, {state: {email}})
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
                <Typography className={cl.register}>Register</Typography>
                <Box className={cl.fields}>
                    <TextField autoComplete={"none"} value={email} type={"email"} onChange={handleChangeEmail} className={cl.text_field}
                               placeholder={"Email"} variant={'standard'}/>
                    <TextField autoComplete={"none"} value={password} type={"password"} onChange={handleChangePassword}
                               className={cl.text_field} placeholder={"Password"} variant={'standard'}/>
                    <TextField autoComplete={"none"} value={confirmPassword} type={"password"} onChange={handleChangePasswordConfirm}
                               className={cl.text_field} placeholder={"Confirm password"} variant={'standard'}/>
                </Box>

                <LoginButton loading={registerLoading} onClick={register}>Register</LoginButton>
            </Box>
        </Box>
    );
};

export default RegisterPage;