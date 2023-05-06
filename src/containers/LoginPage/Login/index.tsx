import React, {ChangeEvent, useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import cl from './style.module.css'
import LoginButton from "../../../components/Button/LoginButton";
import authApi from "../../../api/auth/auth.api";
import {useDispatch} from "react-redux";
import {setAuthorized, setUser} from "../../../redux/store/user/slice";
import {links} from "../../../router";
import {SnackbarKey, useSnackbar} from "notistack";

const LoginPage = () => {
    const location = useLocation()
    const [email, setEmail] = useState(location.state?.email ?? "")
    const [password, setPassword] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value)
    }

    const login = () => {
        setLoginLoading(true)
        authApi.login({email, password})
            .then((res) => {
                console.log('authorized')
                setTimeout(() => {
                    dispatch(setUser({user: res}))
                    dispatch(setAuthorized({isAuthorized: true}))
                    navigate(links.main)
                }, 1500)
            })
            .catch(err => {
                console.log(err.response.data)
                // @ts-ignore
                const key:SnackbarKey = enqueueSnackbar(err.response.data.message[0], {variant: 'error', onClick: () => closeSnackbar(key)})
            })
            .finally(() => setLoginLoading(false))
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.form}>
                <Typography className={cl.login}>Login</Typography>
                <Box className={cl.fields}>
                    <TextField value={email} type={"email"} onChange={handleChangeEmail} className={cl.text_field}
                               placeholder={"Email"} variant={'standard'}/>
                    <TextField value={password} type={"password"} onChange={handleChangePassword}
                               className={cl.text_field} placeholder={"Password"} variant={'standard'}/>
                </Box>
                <Typography className={cl.forgot}>Forgot password</Typography>

                <LoginButton loading={loginLoading} onClick={login}>Login</LoginButton>
            </Box>
        </Box>
    );
};

export default LoginPage;