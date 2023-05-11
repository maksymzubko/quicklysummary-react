import {ReactNode, useEffect, useState} from "react";
import Header from "../../components/Header";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";

interface HeaderLayoutProps {
    children?: ReactNode;
}

const HeaderLayout = () => {
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        function updateHeaderHeight() {
            const header = document.querySelector(".header");
            const computedHeight = getComputedStyle(header).height;
            document.documentElement.style.setProperty('--header-height', computedHeight);
            setHeight(window.innerHeight - parseInt(computedHeight.replace('px', '')))
            console.log(computedHeight)
        }

        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);
        return () => {
            window.removeEventListener("resize", updateHeaderHeight);
        };
    }, []);
    return (
        <>
            <Header/>
            <Box maxWidth={"1920px"} height={`${height}px`}>
                <Outlet/>
            </Box>
        </>
    );
};

export default HeaderLayout;