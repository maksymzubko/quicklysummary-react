import {Box, CircularProgress, Typography} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import authApi from "api/auth/auth.api";
import {useDispatch} from "react-redux";
import _class from './style.module.css'
import GoogleButton from "@components/Button/GoogleButton";
import {linksDesktop} from "router";
import {setAuthorized, setUser} from "redux/store/user/slice";
import {useTranslation} from "react-i18next";
import {messages} from "languages/messages";

const GoogleAuth = (classes?: any) => {
    const cl = classes?._class ?? _class;
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [result, setResult] = useState<boolean>(null)

    const content = useMemo(() => {
        if (result === null) {
            return <>
                <Typography className={cl.oops}>{t(messages.google.loading())}</Typography>
                <CircularProgress/>
            </>
        } else if (result === false) {
            return <>
                <Typography className={cl.oops}>{t(messages.google.oops())}</Typography>
                <Typography className={cl.error}>{t(messages.google.error())}</Typography>
                <GoogleButton onClick={() => {
                    navigate(linksDesktop.auth)
                }}>{t(messages.buttons.goto())}</GoogleButton>
            </>
        } else if (result === true) {
            return <>
                <Typography className={cl.oops}>{t(messages.google.authorized())}</Typography>
                <Typography className={cl.error}>{t(messages.google.redirect_msg())}</Typography>
                <CircularProgress/>
            </>
        }
    }, [result])

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            authApi.loginViaToken(token)
                .then((res) => {
                    setResult(true)
                    dispatch(setUser({user: res}))
                    dispatch(setAuthorized({isAuthorized: true}))
                    setTimeout(() => {
                        navigate(linksDesktop.main)
                    }, 1)
                }).catch(() => {
                setResult(false)
            })
        } else {
            setResult(false)
        }
    }, [])

    return (
        <Box className={cl.container}>
            <Box className={cl.form}>
                {content}
            </Box>
        </Box>
    );
};

export default GoogleAuth;