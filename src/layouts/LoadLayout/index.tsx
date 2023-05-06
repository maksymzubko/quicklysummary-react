import React, {useEffect, useState} from 'react';
import LoadContext from '../../contexts/loadContext';
import {Box, CircularProgress, LinearProgress, Typography} from "@mui/material";
import cl from './style.module.css'

interface LoadLayoutProps {
    children: React.ReactNode;
}

const Index: React.FC<LoadLayoutProps> = ({children}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        console.log(loaded)
        if (!loaded) {
            const timer = setTimeout(() => {
                console.log('timer end')
                setLoaded(true);
            }, 20000); // You can adjust the time here

            return () => clearTimeout(timer);
        }
    }, [loaded]);
    return (
        <LoadContext.Provider value={{loaded, setLoaded}}>
            {children}
            {!loaded &&
                <Box className={cl.container}>
                    <Box className={cl.form}>
                        <Typography className={cl.loading}>Loading content</Typography>
                        <Typography className={cl.wait}>Please wait, we loading content for you.</Typography>
                        <Box width={"100%"}>
                            <LinearProgress />
                        </Box>
                    </Box>
                </Box>}
        </LoadContext.Provider>
    );
};

export default Index;
