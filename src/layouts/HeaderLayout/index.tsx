import {ReactNode, useEffect, useState} from "react";
import Header from "../../components/Header";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import HeaderContext from "../../contexts/headerContext";
import ContactUs from "../../components/ContactUs";

interface HeaderLayoutProps {
    children?: ReactNode;
}

const HeaderLayout = () => {
    const [helpOpened, setHelpOpened] = useState(false)
    const [promptOpened, setPromptOpened] = useState(false)
    const [promptText, setPromptText] = useState("")

    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        function updateHeaderHeight() {
            const header = document.querySelector(".header");
            const computedHeight = getComputedStyle(header).height;
            document.documentElement.style.setProperty('--header-height', computedHeight);
            document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
            setHeight(window.innerHeight - parseInt(computedHeight.replace('px', '')))
        }

        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);
        return () => {
            window.removeEventListener("resize", updateHeaderHeight);
        };
    }, []);
    return (
        <HeaderContext.Provider value={{helpOpened, setHelpOpened, promptOpened, promptText, setPromptOpened, setPromptText}}>
            <ContactUs opened={helpOpened} onClose={() => setHelpOpened(false)}/>
            <Header/>
            <Box margin={"0 auto"} maxWidth={"1920px"} height={`${height}px`}>
                <Outlet/>
            </Box>
        </HeaderContext.Provider>
    );
};

export default HeaderLayout;