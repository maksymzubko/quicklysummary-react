import React, {useState} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import cl from './style.module.css'
import {useSelector} from "react-redux";
import {SelectIsAuthorized, SelectUser} from "../../../redux/store/user/selector";
import HeaderButton, {HeaderMobileButton} from "@components/Button/HeaderButton";
import {useNavigate} from "react-router-dom";
import {linksDesktop} from "../../../router";

export interface HeaderDropDownInterface {
    opened: boolean,
    onClose: () => void
}

const HeaderDropDown = (data: HeaderDropDownInterface) => {
    const [isOpened, setIsOpened] = useState(data.opened)
    const isAuthorized = useSelector(SelectIsAuthorized)
    const userData = useSelector(SelectUser)
    const navigate = useNavigate()
    const handleStateHandler = () => {
        if (isOpened) {
            setIsOpened(false)
            data.onClose()
        } else {
            setIsOpened(true)
        }
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
            <Box className={[cl.icon_hamburger, isOpened ? cl.open : ""].join(' ')}>
                <Box onClick={handleStateHandler}  className={cl.icon}>
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
                        <HeaderMobileButton onClick={()=>{navigate(linksDesktop.auth)}}>Login</HeaderMobileButton>
                    }
                    <Box className={cl.selector}>
                        SELECTOR
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderDropDown;