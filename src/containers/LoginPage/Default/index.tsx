import {Box, TextField, Typography} from "@mui/material";
import {useEffect} from "react";
import cl from './style.module.css'
import AuthButton from "../../../components/Button/AuthButton";
import GoogleIcon from './assets/google_icon.svg'
import AppleIcon from './assets/apple_icon.svg'
import FacebookIcon from './assets/facebook_icon.svg'

const AuthPage = () => {
    const googleAuth = () => {
        window.location.replace(`${process.env.VITE_API_QUICKLY}auth/google`)
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.form}>
                <Typography className={cl.login}>Login</Typography>
                <Typography className={cl.create_account}>or create an account</Typography>
                <Box className={cl.auth_buttons}>
                    <AuthButton onClick={googleAuth} icon_data={{icon:GoogleIcon}}>Continue with Google</AuthButton>
                    <AuthButton onClick={()=>{}} icon_data={{icon:FacebookIcon}}>Continue with Facebook</AuthButton>
                    <AuthButton onClick={()=>{}} icon_data={{icon:AppleIcon, needRevert: true}}>Continue with Apple</AuthButton>
                </Box>
                <Typography className={cl.continue}>or continue with email</Typography>
                <TextField className={cl.text_field} sx={{font:"'Nunito Sans', sans-serif !important"}} placeholder={"name@example.com"} variant={'standard'}/>
                <AuthButton onClick={() => {}}>Continue</AuthButton>
            </Box>
        </Box>
    );
};

export default AuthPage;