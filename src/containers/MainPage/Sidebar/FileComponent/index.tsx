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
    return <SvgIcon sx={{width: "18px", height: "18px"}} viewBox={"0 0 16 16"}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.25 12.375C4.25 12.7065 4.3817 13.0245 4.61612 13.2589C4.85054 13.4933 5.16848 13.625 5.5 13.625H10.5C10.8315 13.625 11.1495 13.4933 11.3839 13.2589C11.6183 13.0245 11.75 12.7065 11.75 12.375V5.3875C11.75 5.27704 11.6605 5.1875 11.55 5.1875H4.45C4.33954 5.1875 4.25 5.27704 4.25 5.3875V12.375Z"
                fill="#1A191D"/>
            <path
                d="M12.375 3.625C12.375 3.27982 12.0952 3 11.75 3H10.2703C10.2173 3 10.1664 2.97893 10.1289 2.94142L9.62108 2.43358C9.58357 2.39607 9.5327 2.375 9.47966 2.375H6.52034C6.4673 2.375 6.41643 2.39607 6.37892 2.43358L5.87108 2.94142C5.83357 2.97893 5.7827 3 5.72966 3H4.25C3.90482 3 3.625 3.27982 3.625 3.625V3.625C3.625 3.97018 3.90482 4.25 4.25 4.25H8H10.1875H11.75C12.0952 4.25 12.375 3.97018 12.375 3.625V3.625Z"
                fill="#1A191D"/>
        </svg>
    </SvgIcon>
}

const EditSVG = () => {
    return <SvgIcon sx={{width: "18px", height: "18px"}} viewBox={"0 0 14 14"}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.3989 5.06562C11.3211 5.1434 11.1952 5.14377 11.1169 5.06646L8.92227 2.89763C8.84337 2.81966 8.843 2.69238 8.92143 2.61395L9.59584 1.93954C9.81945 1.71593 10.0942 1.60413 10.4201 1.60413C10.746 1.60413 11.0205 1.71593 11.2438 1.93954L12.0604 2.75621C12.284 2.97982 12.4007 3.24971 12.4104 3.56588C12.4201 3.88204 12.3132 4.15174 12.0896 4.37496L11.3989 5.06562ZM2.33334 12.25C2.16806 12.25 2.02942 12.194 1.91742 12.082C1.80542 11.97 1.74961 11.8315 1.75 11.6666V10.0187C1.75 9.94093 1.76459 9.86549 1.79375 9.79238C1.82292 9.71926 1.86667 9.65374 1.925 9.59579L7.79191 3.72888C7.87002 3.65078 7.99665 3.65078 8.07476 3.72888L10.2711 5.9252C10.3492 6.00331 10.3492 6.12994 10.2711 6.20805L4.40417 12.075C4.34584 12.1333 4.28031 12.177 4.20759 12.2062C4.13486 12.2354 4.05942 12.25 3.98125 12.25H2.33334Z"
                fill="#1A191D"/>
        </svg>
    </SvgIcon>
}

const SuccessSVG = () => {
    return <SvgIcon sx={{width: "18px", height: "18px"}} viewBox={"0 0 20 20"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                strokeWidth="1" stroke="#1A191D"
                d="M16.9124 5.24581C17.2369 5.57035 17.2369 6.09654 16.9124 6.42109L8.2071 15.1263C7.81657 15.5169 7.18341 15.5169 6.79288 15.1263L3.50452 11.838C3.17985 11.5133 3.17985 10.9869 3.50452 10.6623C3.8289 10.3379 4.35473 10.3375 4.67952 10.6615L7.49999 13.4751L15.7374 5.24553C16.0619 4.92125 16.5879 4.92137 16.9124 5.24581Z"
                fill="#1A191D"/>
        </svg>
    </SvgIcon>
}

const CancelSVG = () => {
    return <SvgIcon sx={{width: "18px", height: "18px"}} viewBox={"0 0 20 20"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.63165 14.3692L10.0008 10L14.37 14.3692M14.37 5.63086L9.99999 10L5.63165 5.63086"
                stroke="#1A191D" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"/>
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
                <IconButton onClick={() => {
                    changeAction("Edit")
                }} sx={{width: "16px", height: "16px"}}>
                    <EditSVG/>
                </IconButton>
                <IconButton onClick={() => {
                    changeAction("Delete")
                }} sx={{width: "16px", height: "16px"}}>
                    <DeleteSVG/>
                </IconButton>
            </>
        else if (currentAction === 'Edit') return <>
            <IconButton onClick={confirmEdit} sx={{width: "16px", height: "16px"}}>
                <SuccessSVG/>
            </IconButton>
            <IconButton disabled={true} sx={{cursor: "default", width: "16px", height: "16px", opacity: ".5"}}>
                <EditSVG/>
            </IconButton>
        </>
        else return <>
                <IconButton onClick={deleteTicket} sx={{width: "16px", height: "16px"}}>
                    <SuccessSVG/>
                </IconButton>
                <IconButton onClick={cancelDelete} sx={{width: "16px", height: "16px"}}>
                    <CancelSVG/>
                </IconButton>
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