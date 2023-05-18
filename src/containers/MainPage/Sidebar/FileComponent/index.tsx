import React, {KeyboardEventHandler, useCallback, useEffect, useState} from 'react';
import {Box, CircularProgress, IconButton, Input, SvgIcon} from "@mui/material";
import cl from './style.module.css'
import CustomButton from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {addStatus, removeTicket, updateStatus, updateTicketName} from "../../../../redux/store/manager/slice";
import {v4 as uuidv4} from "uuid";
import userApi from "../../../../api/user/user.api";
import {AlertType} from "react-mui-dropzone";
import {SnackbarKey, useSnackbar} from "notistack";
import IconBtn from "../../../../components/IconButton";

export interface FileTicket {
    ticketId: number;
    ticketName: string;
}

export interface FileInterface {
    ticket: FileTicket;
    onSelect: (id: number) => void;
    onDelete: () => void;
    isSelected: boolean;
}

export type Actions = "Delete" | "Edit" | "None";

const DeleteSVG = () => {
    return <SvgIcon viewBox={"0 0 32 32"}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="none"/>
            <path d="M11 21.8333C11 22.2754 11.1756 22.6993 11.4881 23.0118C11.8007 23.3244 12.2246 23.5 12.6667 23.5H19.3333C19.7754 23.5 20.1993 23.3244 20.5118 23.0118C20.8244 22.6993 21 22.2754 21 21.8333V12.45C21 12.3395 20.9104 12.25 20.8 12.25H11.2C11.0895 12.25 11 12.3395 11 12.45V21.8333Z" fill="#1A191D"/>
            <path d="M21.8333 10.1667C21.8333 9.70643 21.4602 9.33333 21 9.33333H18.9995C18.9465 9.33333 18.8956 9.31226 18.8581 9.27475L18.1419 8.55858C18.1044 8.52107 18.0535 8.5 18.0005 8.5H13.9995C13.9465 8.5 13.8956 8.52107 13.8581 8.55858L13.1419 9.27475C13.1044 9.31226 13.0535 9.33333 13.0005 9.33333H11C10.5398 9.33333 10.1667 9.70643 10.1667 10.1667C10.1667 10.6269 10.5398 11 11 11H16H18.9167H21C21.4602 11 21.8333 10.6269 21.8333 10.1667Z" fill="#1A191D"/>
        </svg>
    </SvgIcon>
}

const EditSVG = () => {
    return <SvgIcon viewBox={"0 0 32 32"}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="none"/>
            <path d="M23.2583 11.8666C22.975 12.1499 22.7 12.4249 22.6917 12.6999C22.6667 12.9666 22.95 13.2416 23.2167 13.4999C23.6167 13.9166 24.0083 14.2916 23.9917 14.6999C23.975 15.1082 23.55 15.5332 23.125 15.9499L19.6833 19.3999L18.5 18.2166L22.0417 14.6832L21.2417 13.8832L20.0583 15.0582L16.9333 11.9332L20.1333 8.74155C20.4583 8.41655 21 8.41655 21.3083 8.74155L23.2583 10.6916C23.5833 10.9999 23.5833 11.5416 23.2583 11.8666ZM8.5 20.3749L16.4667 12.3999L19.5917 15.5249L11.625 23.4999H8.5V20.3749Z" fill="#0C0C0C"/>
        </svg>
    </SvgIcon>
}

const SuccessSVG = () => {
    return <SvgIcon viewBox={"0 0 32 32"}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="none"/>
            <path d="M22.9124 11.2458C23.2369 11.5704 23.2369 12.0965 22.9124 12.4211L14.2071 21.1263C13.8166 21.5169 13.1834 21.5169 12.7929 21.1263L9.50452 17.838C9.17985 17.5133 9.17985 16.9869 9.50452 16.6623C9.8289 16.3379 10.3547 16.3375 10.6795 16.6615L13.5 19.4751L21.7374 11.2455C22.0619 10.9212 22.5879 10.9214 22.9124 11.2458Z" fill="#1A191D"/>
        </svg>
    </SvgIcon>
}

const CancelSVG = () => {
    return <SvgIcon viewBox={"0 0 32 32"}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="none"/>
            <path d="M11.6317 20.3692L16.0008 16L20.37 20.3692M20.37 11.6309L16 16L11.6317 11.6309" stroke="#1A191D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </SvgIcon>
}

const FileComponent = (data: FileInterface) => {
    const [currentAction, setCurrentAction] = useState<Actions>("None");
    const [currentValue, setCurrentValue] = useState(data.ticket.ticketName);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    //@ts-ignore
    const handleChangeValue = (e: any) => {
        if (currentValue.length <= maxLength || e.target.value.length < currentValue.length)
            setCurrentValue(e.target.value);
    }

    //@ts-ignore
    const handleKeyDown = (e: any) => {
        if (e.code === "Escape") cancelEdit()
        if (e.code === "Enter") confirmEdit()
    }

    const handleClick = () => {
        data.onSelect(data.ticket.ticketId);
    }

    const changeAction = (action: Actions) => {
        setCurrentAction(action);
    }

    const cancelEdit = () => {
        setCurrentAction("None")
        setCurrentValue(data.ticket.ticketName);
    }

    const onAlert = (message: string, variant: AlertType) => {
        //@ts-ignore
        const key: SnackbarKey = enqueueSnackbar(message, {variant: variant, onClick: () => closeSnackbar(key)})
    }

    const deleteTicket = () => {
        setLoading(true)
        const id = uuidv4();
        dispatch(addStatus({status: {id, status: "In process", name: `Delete ticket #${data.ticket.ticketId}`}}))
        userApi.deleteTicket(data.ticket.ticketId)
            .then(() => {
                dispatch(removeTicket({ticketId: data.ticket.ticketId}))
                dispatch(updateStatus({status: {id, status: "Done", name: `Delete ticket #${data.ticket.ticketId}`}}))
            })
            .catch(err => {
                onAlert(err?.response?.data?.message[0], "error");
                dispatch(updateStatus({status: {id, status: "Error", name: `Delete ticket #${data.ticket.ticketId}`}}))
            })
            .finally(() => setLoading(false))
    }

    const cancelDelete = () => {
        setCurrentAction("None")
    }
    const maxLength = 40;
    const confirmEdit = () => {
        console.log(currentValue, data.ticket)
        if (currentValue === data.ticket.ticketName) {
            cancelEdit()
            return
        }

        setLoading(true)
        const id = uuidv4();
        dispatch(addStatus({status: {id, status: "In process", name: `Rename ticket #${data.ticket.ticketId}`}}))
        userApi.renameTicket(data.ticket.ticketId, currentValue)
            .then(() => {
                dispatch(updateTicketName({id: data.ticket.ticketId, name: currentValue}))
                dispatch(updateStatus({status: {id, status: "Done", name: `Rename ticket #${data.ticket.ticketId}`}}))
            })
            .catch(err => {
                onAlert(err?.response?.data?.message[0], "error");
                dispatch(updateStatus({status: {id, status: "Error", name: `Rename ticket #${data.ticket.ticketId}`}}))
                cancelEdit()
            })
            .finally(() => {
                setLoading(false)
                setCurrentAction("None")
            })
    }

    const BtnContent = useCallback(() => {
        if (loading) return <>
            <CustomButton onClick={() => {
            }} disabled={true} loading={true} style={{height: "16px"}} args={{data_outline: "none"}}
                          children={""}/>
        </>
        if (currentAction === 'None')
            return <>
                <IconBtn onClick={() => {
                    changeAction("Edit")
                }} sx={{width: "16px", height: "16px"}}>
                    <EditSVG/>
                </IconBtn>
                <IconBtn onClick={() => {
                    changeAction("Delete")
                }} sx={{width: "16px", height: "16px"}}>
                    <DeleteSVG/>
                </IconBtn>
            </>
        else if (currentAction === 'Edit') return <>
            <IconBtn onClick={confirmEdit} sx={{width: "16px", height: "16px"}}>
                <SuccessSVG/>
            </IconBtn>
            <IconBtn disabled={true} sx={{cursor: "default", width: "16px", height: "16px", opacity: ".5"}}>
                <EditSVG/>
            </IconBtn>
        </>
        else return <>
                <IconBtn onClick={deleteTicket} sx={{width: "16px", height: "16px"}}>
                    <SuccessSVG/>
                </IconBtn>
                <IconBtn onClick={cancelDelete} sx={{width: "16px", height: "16px"}}>
                    <CancelSVG/>
                </IconBtn>
            </>
    }, [currentAction, loading, currentValue])

    return (
        <Box onClick={handleClick} className={[cl.container, data.isSelected ? cl.selected : ''].join(' ')}>
            <Box className={cl.content}>
                <Box className={cl.text}>
                    {currentAction !== 'Edit' ? data.ticket.ticketName :
                        <input onKeyDown={handleKeyDown} autoFocus={true} onChange={handleChangeValue}
                               value={currentValue}/>}
                </Box>
                <Box className={cl.icons}>
                    <BtnContent/>
                </Box>
            </Box>
        </Box>
    );
};

export default FileComponent;