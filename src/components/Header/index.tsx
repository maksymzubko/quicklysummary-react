import {Avatar, Box, Button} from "@mui/material";
import Logo from './assets/logo.svg';
import cl from './style.module.css'
import {useCallback, useContext, useEffect, useState} from "react";
import CustomSelector, {AnimationSides} from "../CustomSelector";
import HeaderButton from "../Button/HeaderButton/index";
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized, SelectLanguage} from "../../redux/store/user/selector";
import {useLocation, useNavigate} from "react-router-dom";
import {links} from "../../router";
import HeaderDropDown from "../HeaderDropDown/index";
import {Languages} from "../../api/user/types";
import i18n from 'i18next';
import {setLanguage} from "../../redux/store/user/slice";
import {useTranslation} from "react-i18next";
import {messages} from "../../languages/messages";
const languageList = ['en', 'jp', 'ua', 'ru'] as Languages[]

const Header = () => {
    const isAuthorized = useSelector(SelectIsAuthorized)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentLang = useSelector(SelectLanguage) as Languages
    const { t } = useTranslation();

    const changeLanguage = (lang: Languages) => {
        i18n.changeLanguage(Languages[lang]);
        localStorage.setItem('qs_language', Languages[lang]);
        dispatch(setLanguage({language: Languages[lang]}));
    }

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
                <CustomSelector data={languageList} initialValue={currentLang} animationSide={AnimationSides.left} onChangeValue={changeLanguage}/>
                {isShow() && <HeaderButton onClick={()=>{navigate(links.auth)}}>{t(messages.header.login())}</HeaderButton>}
                {isAuthorized && <HeaderDropDown/>}
            </Box>
        </Box>
    );
};

export default Header;