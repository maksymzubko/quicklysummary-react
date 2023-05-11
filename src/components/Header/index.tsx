import {Avatar, Box, Button} from "@mui/material";
import Logo from './assets/logo.svg';
import cl from './style.module.css'
import {useCallback, useContext, useEffect, useState} from "react";
import CustomSelector, {AnimationSides} from "../CustomSelector";
import HeaderButton from "../Button/HeaderButton/index";
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized} from "../../redux/store/user/selector";
import {useLocation, useNavigate} from "react-router-dom";
import {links} from "../../router";
import authApi from "../../api/auth/auth.api";
import {setAuthorized, setUser} from "../../redux/store/user/slice";
import LoadContext from "../../contexts/loadContext";
import userApi from "../../api/user/user.api";
import HeaderDropDown from "../HeaderDropDown/index";
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
            <Box onClick={()=>{navigate(links.landing)}} className={cl.logo}>
                <img src={Logo} alt='logo'/>
                QuicklySummary
            </Box>
            <Box className={cl.menu}>
                <CustomSelector data={languageList} animationSide={AnimationSides.left} onChangeValue={()=>{}}/>
                {isShow() && <HeaderButton onClick={()=>{navigate(links.auth)}}>Login</HeaderButton>}
                {isAuthorized && <HeaderDropDown/>}
            </Box>
        </Box>
    );
};

export default Header;