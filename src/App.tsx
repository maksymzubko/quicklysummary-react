import './App.css'
import {useRoutes} from "react-router-dom";
import {routes as r} from "./router";
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized} from "./redux/store/user/selector";
import LoadContext from "./contexts/loadContext";
import React, {Suspense, useEffect, useState} from "react";
import cl from "./layouts/LoadLayout/style.module.css";
import {Box, LinearProgress, Typography} from "@mui/material";
import authApi from "./api/auth/auth.api";
import {setAuthorized, setLanguage, setUser} from "./redux/store/user/slice";
import i18n from "i18next";
import {Languages} from "./api/user/types";


function App() {
    const isAuthorized = useSelector(SelectIsAuthorized)
    const routes = useRoutes(isAuthorized ? r.authorized : r["not-authorized"]);
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loaded) {
            const timer = setTimeout(() => {
                setLoaded(true);
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, [loaded]);

    useEffect(() => {
        const language = localStorage.getItem("qs_language")
        if(language)
        {
            dispatch(setLanguage({language: language}))
            i18n.changeLanguage(language);
        }
        else
            localStorage.setItem("qs_language", "en")

        const token = localStorage.getItem('quickly_summary_token');
        if (token) {
            authApi.verifyToken()
                .then(() => {
                    dispatch(setAuthorized({isAuthorized: true}))
                    dispatch(setUser({user: JSON.parse(token)}))
                    setLoaded(true)
                }).catch(() => {
                dispatch(setAuthorized({isAuthorized: false}))
                dispatch(setUser({user: null}))
                setLoaded(true)
            })
        }
        else setLoaded(true)
    }, [])

    return (
        <>
            <LoadContext.Provider value={{loaded, setLoaded}}>
                <Suspense fallback={!loaded &&
                    <Box className={cl.container}>
                        <Box className={cl.form}>
                            <Typography className={cl.loading}>Loading content</Typography>
                            <Typography className={cl.wait}>Please wait, we loading content for you.</Typography>
                            <Box width={"100%"}>
                                <LinearProgress/>
                            </Box>
                        </Box>
                    </Box>}>
                    {routes}
                </Suspense>
            </LoadContext.Provider>
        </>
    )
}

export default App
