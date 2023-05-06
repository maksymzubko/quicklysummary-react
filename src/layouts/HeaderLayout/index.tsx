import {ReactNode, useEffect} from "react";
import Header from "../../components/Header";
import {Outlet} from "react-router-dom";

interface HeaderLayoutProps {
    children?: ReactNode;
}

const HeaderLayout = () => {
    useEffect(() => {
        function updateHeaderHeight() {
            const header = document.querySelector(".header");
            const computedHeight = getComputedStyle(header).height;
            document.documentElement.style.setProperty('--header-height', computedHeight);
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
            <Outlet/>
        </>
    );
};

export default HeaderLayout;