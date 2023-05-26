import {ReactNode, useEffect, useState} from "react";
import HeaderDesktop from "@components/Desktop/Header";
import HeaderMobile from "@components/Mobile/Header";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import HeaderContext from "contexts/headerContext";
import ContactUs from "@components/Desktop/ContactUs";
import {useDispatch, useSelector} from "react-redux";
import {setIsMobile as setMobile} from 'redux/store/user/slice'
import {SelectIsMobile} from "../../redux/store/user/selector";

interface HeaderLayoutProps {
    children?: ReactNode;
}

const HeaderLayout = () => {
    const [helpOpened, setHelpOpened] = useState(false)
    const [promptOpened, setPromptOpened] = useState(false)
    const [promptText, setPromptText] = useState("")
    const isMobile = useSelector(SelectIsMobile)

    const dispatch = useDispatch()
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        let isMob = isMobile
        function updateHeaderHeight() {
            const header = document.querySelector(".header");
            const computedHeight = getComputedStyle(header).height;
            document.documentElement.style.setProperty('--header-height', computedHeight);
            document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
            setHeight(window.innerHeight - parseInt(computedHeight.replace('px', '')))
            if (window.innerWidth < 769 && !isMob) {
                dispatch(setMobile({isMobile: true}))
                isMob = true
            }
            if (window.innerWidth > 768 && isMob) {
                dispatch(setMobile({isMobile: false}))
                isMob = false
            }
        }

        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);
        return () => {
            window.removeEventListener("resize", updateHeaderHeight);
        };
    }, [isMobile]);

    return (
        <HeaderContext.Provider
            value={{helpOpened, setHelpOpened, promptOpened, promptText, setPromptOpened, setPromptText}}>
            {!isMobile && <ContactUs opened={helpOpened} onClose={() => setHelpOpened(false)}/>}
            {isMobile ? <HeaderMobile/> : <HeaderDesktop/>}
            <Box margin={"0 auto"} maxWidth={isMobile ? "768px" : "1920px"} height={isMobile ? "100%" : `${height}px`}>
                <Outlet/>
            </Box>
        </HeaderContext.Provider>
    );
};

export default HeaderLayout;