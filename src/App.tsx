import './App.css'
import {useRoutes} from "react-router-dom";
import {routes as r} from "./router";
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized} from "./redux/store/user/selector";
import LoadContext from "./contexts/loadContext";
import React, {Suspense, useEffect, useState} from "react";
import cl from "./layouts/LoadLayout/style.module.css";
import {Box, LinearProgress, Typography} from "@mui/material";


function App() {
    const isAuthorized = useSelector(SelectIsAuthorized)
    const routes = useRoutes(isAuthorized ? r.authorized : r["not-authorized"]);
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (!loaded) {
            const timer = setTimeout(() => {
                setLoaded(true);
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, [loaded]);

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
