import React, {useContext, useEffect, useState, useTransition} from 'react';
import {Avatar, Box, ClickAwayListener, Divider, Typography} from "@mui/material";
import cl from '@components/Desktop/HeaderDropDown/style.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "redux/store/user/selector";
import {setAuthorized, setUser} from "redux/store/user/slice";
import {useLocation, useNavigate} from "react-router-dom";
import {linksDesktop} from "router";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HeaderContext from "contexts/headerContext";
import {messages} from "languages/messages";
import {useTranslation} from "react-i18next";

const HeaderDropDown = () => {
    const [show, setShow] = useState(false)
    const {setHelpOpened} = useContext(HeaderContext);

    const [canClose, setCanClose] = useState(false)
    const userData = useSelector(SelectUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useTranslation();

    useEffect(() => {
        setShow(false)
        setHelpOpened(false)
    }, [location])

    const logOut = () => {
        localStorage.removeItem('quickly_summary_token')
        dispatch(setUser({user: null}))
        dispatch(setAuthorized({isAuthorized: false}))
        navigate(linksDesktop.landing)

        setShow(false)
    }

    useEffect(() => {
        if(show){
            setTimeout(()=>{
                setCanClose(true)
            }, 500)
        }
        else
        {
            setTimeout(()=>{
                setCanClose(false)
            }, 100)
        }
    }, [show])

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(`.${cl.dropdown_container}`).setAttribute("data-dont-animate", "0");
        }, 500)
    }, [])

    const onClose = () => {
        if(canClose) setShow(false)
    }

    const getName = () => {
        if(userData?.name)
            return userData?.name
        if(userData?.uuid)
            return userData.uuid
        return "Incorrect"
    }

    return (
        <Box className={cl.container}>
            <Box onClick={() => setShow(!show)} className={cl.click_item}>
                <Avatar src={userData?.avatar ?? ""} sx={{height:"32px", width:"32px"}}/>
            </Box>
            <ClickAwayListener onClickAway={onClose}>
                <Box data-dont-animate={"1"} className={[cl.dropdown_container, show ? cl.show : cl.hide].join(' ')}>
                    <Box className={cl.header}>
                        <Avatar src={userData?.avatar ?? ""}/>
                        <Box className={cl.info}>
                            <Typography className={cl.name}>{getName()}</Typography>
                            <Typography className={cl.email}>{userData?.email ?? "Incorrect email"}</Typography>
                        </Box>
                    </Box>
                    {/*<Box onClick={()=>setShow(false)} className={cl.content}>*/}
                    {/*    <PortraitIcon fontSize={"small"}/> Profile Details*/}
                    {/*</Box>*/}
                    {/*<Box onClick={()=>setShow(false)} className={cl.content}>*/}
                    {/*    <MonetizationOnOutlinedIcon fontSize={"small"}/> Plans and Billing*/}
                    {/*</Box>*/}
                    <Box onClick={() => setHelpOpened(true)} className={cl.content}>
                        <ChatBubbleOutlineIcon fontSize={"small"}/> {t(messages.header.contactUs())}
                    </Box>
                    <hr/>
                    <Box onClick={logOut} className={cl.content}>
                        <LogoutIcon fontSize={"small"}/> {t(messages.header.logout())}
                    </Box>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default HeaderDropDown;