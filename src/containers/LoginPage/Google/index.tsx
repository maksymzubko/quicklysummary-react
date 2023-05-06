import {Box} from "@mui/material";
import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import authApi from "../../../api/auth/auth.api";

const GoogleAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [result, setResult] = useState("")

    useEffect(() => {
        const token = searchParams.get('token')
        if(token)
        {
            authApi.loginViaToken(token)
            .then(()=>{
                setResult("Correct token")
            }).catch(() => {
                setResult("Incorrect token")
            })
        }
        else
        {
            setResult("Incorrect token")
        }
    }, [])

    return (
        <Box>
            {result}
        </Box>
    );
};

export default GoogleAuth;