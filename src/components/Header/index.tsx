import {Box, Button} from "@mui/material";
import Logo from './assets/logo.svg';
import cl from './style.module.css'
import {useCallback, useState} from "react";
import CustomSelector, {AnimationSides} from "../CustomSelector";
import HeaderButton from "../Button/HeaderButton/index";
import {useSelector} from "react-redux";
import {SelectIsAuthorized} from "../../redux/store/user/selector";
import {useLocation, useNavigate} from "react-router-dom";
import {links} from "../../router";
const languageList = ['en', 'jp', 'ua', 'ru']

const Header = () => {
    const isAuthorized = useSelector(SelectIsAuthorized)
    const location = useLocation()
    const navigate = useNavigate()

    const isShow = useCallback(() => {
        return !isAuthorized && !location.pathname.includes('auth')
    }, [isAuthorized, location.pathname])

    return (
        <Box className={[cl.container, 'header'].join(' ')}>
            <Box className={cl.logo}>
                <img src={Logo} alt='logo'/>
                QuicklySummary
            </Box>
            <Box className={cl.menu}>
                <CustomSelector data={languageList} animationSide={AnimationSides.left} onChangeValue={()=>{}}/>
                {isShow() && <HeaderButton onClick={()=>{navigate(links.auth)}}>Login</HeaderButton>}
            </Box>
        </Box>
    );
};

export default Header;