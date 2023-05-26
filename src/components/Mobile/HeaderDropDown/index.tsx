import React, {useState} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import cl from './style.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized, SelectLanguage, SelectUser} from "../../../redux/store/user/selector";
import {useNavigate} from "react-router-dom";
import {linksDesktop, linksMobile} from "router";
import CustomSelector from "@components/Mobile/CustomSelector";
import i18n from "i18next";
import {Languages} from "api/user/types";
import {setAuthorized, setLanguage, setUser} from "redux/store/user/slice";
import {useTranslation} from "react-i18next";

export interface HeaderDropDownInterface {
    opened: boolean,
    onClose: () => void
}

const HeaderDropDown = (data: HeaderDropDownInterface) => {
    const [isOpened, setIsOpened] = useState(data.opened)
    const [isOpenedSelector, setIsOpenedSelector] = useState(false)
    const isAuthorized = useSelector(SelectIsAuthorized)
    const userData = useSelector(SelectUser)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const currentLang = useSelector(SelectLanguage) as Languages
    const { t } = useTranslation();

    const handleStateHandler = () => {
        if (isOpened) {
            setIsOpened(false)
            setIsOpenedSelector(false)
            data.onClose()
        } else {
            setIsOpened(true)
        }
    }

    const getName = () => {
        if (userData?.name)
            return userData?.name
        if (userData?.uuid)
            return userData.uuid
        return "Incorrect"
    }

    const handleSelectLanguage = (id: Languages) => {
        i18n.changeLanguage(Languages[id]);
        localStorage.setItem('qs_language', Languages[id]);
        dispatch(setLanguage({language: Languages[id]}));
    }

    const handleClickLogin = () => {
        navigate(linksMobile.auth)
        handleStateHandler()
    }

    const logOut = () => {
        localStorage.removeItem('quickly_summary_token')
        dispatch(setUser({user: null}))
        dispatch(setAuthorized({isAuthorized: false}))
        navigate(linksDesktop.landing)

        handleStateHandler()
    }


    return (
        <Box className={cl.container}>
            <Box className={[cl.icon_hamburger, isOpened ? cl.open : ""].join(' ')}>
                <Box onClick={handleStateHandler} className={cl.icon}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Box>
                <Box className={cl.drop_menu}>
                    {isAuthorized ?
                        <Box className={cl.user_data}>
                            <Avatar src={userData?.avatar ?? ""}/>
                            <Box className={cl.info}>
                                <Typography className={cl.name}>{getName()}</Typography>
                                <Typography className={cl.email}>{userData?.email ?? "Incorrect email"}</Typography>
                            </Box>
                        </Box>
                        :
                        <Box onClick={handleClickLogin} className={cl.login}>Login</Box>
                    }
                    <CustomSelector content={[
                        {id: "en", name: "EN"},
                        {id: "ru", name: "RU"},
                        {id: "jp", name: "JP"},
                        {id: "ua", name: "UA"}
                    ]}
                                    opened={isOpenedSelector}
                                    selected={currentLang}
                                    name={"Language"}
                                    onSelect={handleSelectLanguage}/>
                    {isAuthorized && <Box className={cl.logout} onClick={logOut}>Log out</Box>}
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderDropDown;