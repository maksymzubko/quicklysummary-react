import {Box, CircularProgress, Typography} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import authApi from "../../../api/auth/auth.api";
import {useDispatch} from "react-redux";
import cl from './style.module.css'
import GoogleButton from "../../../components/Button/GoogleButton";
import {links} from "../../../router";
import {setAuthorized, setUser} from "../../../redux/store/user/slice";

const GoogleAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [result, setResult] = useState<boolean>(null)

    const content = useMemo(() => {
        if (result === null) {
            return <>
                <Typography className={cl.oops}>Loading...</Typography>
                <CircularProgress/>
            </>
        } else if (result === false) {
            return <>
                <Typography className={cl.oops}>Oops..</Typography>
                <Typography className={cl.error}>Having trouble trying to sign in with Google..</Typography>
                <GoogleButton onClick={() => {
                    navigate(links.auth)
                }}>Go to login page</GoogleButton>
            </>
        } else if (result === true) {
            return <>
                <Typography className={cl.oops}>Authorized</Typography>
                <Typography className={cl.error}>You will be redirected in few seconds..</Typography>
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
                    setTimeout(() => {
                        dispatch(setUser({user: res}))
                        navigate(links.main)
                        dispatch(setAuthorized({isAuthorized: true}))
                    }, 1500)
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