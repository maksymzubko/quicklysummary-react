import React, {useCallback, useEffect, useState} from 'react';
import {Box, Divider, IconButton, SvgIcon} from "@mui/material";
import cl from './style.module.css'
import Sidebar from "./Sidebar/index";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Adobe from './assets/adobe-acrobat-dc-logo-2020-1 1.svg'
import PDFButton from "../../components/Button/PDFButton/index";
import DragResizeContainer from "../../components/DragResizeContainer/index";
import CustomSelector, {AnimationSides} from "../../components/CustomSelector";
import {useDispatch, useSelector} from "react-redux";
import {SelectStatuses, SelectTickets} from "../../redux/store/manager/selector";
import userApi from "../../api/user/user.api";
import {addGPTResponse, addStatus, addTicket, setTickets, updateStatus} from "../../redux/store/manager/slice";
import {GptRequest, Languages, TypeResponse} from "../../api/user/types";
import {v4 as uuidv4} from "uuid";
import {AlertType} from "react-mui-dropzone";
import {SnackbarKey} from "notistack";
import { jsPDF } from "jspdf";

const MainPage = () => {
    const tickets = useSelector(SelectTickets)
    const statuses = useSelector(SelectStatuses)
    const dispatch = useDispatch()

    const [gptLanguage, setGptLanguage] = useState<Languages>(Languages.en)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [scale, setScale] = useState(100)
    const [selectedGpt, setSelectedGpt] = useState(null)
    const [types, setTypes] = useState<TypeResponse[]>([])
    const [loadingList, setLoadingList] = useState([])

    useEffect(() => {
        userApi.getTickets()
            .then(res => {
                dispatch(setTickets({tickets: res}))
            })
            .catch(err => {
                console.log(err.response?.data?.message)
            })
        userApi.getTypes()
            .then(res => {
                setTypes(res)
            })
            .catch(err => {
                console.log(err.response?.data?.message)
            })
    }, [])

    const scaleUp = () => {
        setScale(scale < 200 ? scale + 25 : scale)
    }

    const scaleDown = () => {
        setScale(scale > 100 ? scale - 25 : scale)
    }

    const reset = () => {
        setScale(100)
    }

    const getFontSize = useCallback(() => {
        const fontSize = 14 + (scale - 100) / 25;
        return fontSize;
    }, [scale])

    const changeActiveGpt = (id: number) => {
        setSelectedGpt(id)
    }

    const onChangeTicket = (id: number) => {
        setSelectedGpt(types[0].id);
        setSelectedTicket(id);
    }

    const initialText = useCallback(() => {
        return tickets.find(i => i.ticketId === selectedTicket)?.ticketFileText;
    }, [selectedTicket, tickets])

    const gptText = useCallback(() => {
        console.log(tickets, selectedTicket, selectedGpt)
        return tickets.find(i => i.ticketId === selectedTicket)
            ?.gptFiles.find(g => g.reqId === selectedGpt)?.content;
    }, [selectedTicket, selectedGpt, tickets])

    const onChangeLanguage = (lang: Languages) => {
        setGptLanguage(lang);
    }

    const sendGPTReq = () => {
        const id = uuidv4();
        const ticketName = tickets.find(i => i.ticketId === selectedTicket)
            ?.ticketName;
        const selected = selectedGpt;
        const selectedType = types.find(t=>t.id === selected);
        const name = `${ticketName}[${selectedType.name}]`;

        const list = selected === 2 ? [1,2] : [selected]
        setLoadingList(prev=>[...prev, ...list]);

        dispatch(addStatus({status: {id: id, name, status: "In process"}}))

        const data = {reqId: selected, lang: Languages[gptLanguage], message: selectedType.message[gptLanguage], ticketId: selectedTicket} as GptRequest;

        userApi.sendRequest(data).then(res=>{
            dispatch(addGPTResponse({id: selectedTicket, gpt: res}))
            dispatch(updateStatus({status: {id: id, name, status: "Done"}}))
        }).catch(err=>{
            onAlert(err?.response?.data?.message[0], "error")
            dispatch(updateStatus({status: {id: id, name, status: "Error"}}))
        }).finally(()=>setLoadingList(prev=>[...prev.filter(p=>!list.includes(p))]))
    }

    const onAlert = (message: string, variant: AlertType) => {
        //@ts-ignore
        const key: SnackbarKey = enqueueSnackbar(message, {variant: variant, onClick: () => closeSnackbar(key)})
    }

    const downloadPDF = (initialText = false) => {
        const doc = new jsPDF();
        const ticket = tickets.find(t=>t.ticketId === selectedTicket);
        const gpt = ticket.gptFiles.find(g=>g.reqId === selectedGpt);
        // const text = initialText ? document.getElementById("initial_text_content").innerText : document.getElementById("gpt_text_content").innerText;
        const text = initialText ? ticket.ticketFileText : gpt.content;

        doc.text(text, 10, 10, {maxWidth: 200});
        const selectedType = types.find(t=>t.id === selectedGpt);
        const ticketName = ticket.ticketName.replace(".txt", "");
        const name = `${initialText ? ticketName : `${ticketName}[${selectedType.name}]`}.pdf`

        doc.save(name);
    }

    const disabledStart = useCallback(() => {
        if(selectedGpt === 6) return true;

        const text = tickets.find(i => i.ticketId === selectedTicket)
            ?.gptFiles.find(g => g.reqId === selectedGpt)?.content;

        if (selectedTicket === null || selectedGpt === null)
            return true;
        if (text)
            return true;

        return false;
    }, [selectedTicket, selectedGpt])

    const loadingStart = useCallback(() => {
        return loadingList.includes(selectedGpt)
    }, [selectedTicket, selectedGpt, loadingList])

    return (
        <Box className={[cl.container].join(' ')}>
            <Sidebar onSelectTicket={onChangeTicket} statuses={statuses} tickets={tickets}/>
            <Box id={"content"} className={[cl.content, !initialText() ? cl.disabled : ''].join(' ')}>
                <Box style={{height: "50%"}} id={"text"} className={cl.text_reader}>
                    <Box className={cl.reader_actions}>
                        <Box className={cl.left_side}>
                            <Box className={cl.scale}>{scale}%</Box>
                            <Box className={cl.buttons}>
                                <IconButton onClick={scaleUp} size={"small"}>
                                    <AddIcon color={"primary"}/>
                                </IconButton>
                                <IconButton onClick={scaleDown} size={"small"}>
                                    <RemoveIcon color={"primary"}/>
                                </IconButton>
                                {scale > 100 && <IconButton onClick={reset} size={"small"}>
                                    <SvgIcon viewBox={"0 0 20 20"}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="none"/>
                                            <path
                                                d="M9.22307 6.67391L6.33911 3.84783C5.98786 3.50362 5.90948 3.10978 6.10396 2.6663C6.29844 2.22283 6.64489 2.00072 7.14329 2H12.8557C13.3549 2 13.7017 2.2221 13.8962 2.6663C14.0907 3.11051 14.0119 3.50435 13.6599 3.84783L10.776 6.67391C10.665 6.78261 10.5449 6.86413 10.4155 6.91848C10.2861 6.97283 10.1474 7 9.99952 7C9.85162 7 9.71297 6.97283 9.58356 6.91848C9.45415 6.86413 9.33399 6.78261 9.22307 6.67391Z"
                                                fill="#1A191D"/>
                                            <path
                                                d="M10.7769 13.3261L13.6609 16.1522C14.0121 16.4964 14.0905 16.8902 13.896 17.3337C13.7016 17.7772 13.3551 17.9993 12.8567 18L7.14426 18C6.64512 18 6.2983 17.7779 6.10382 17.3337C5.90934 16.8895 5.98809 16.4957 6.34008 16.1522L9.22404 13.3261C9.33496 13.2174 9.45512 13.1359 9.58453 13.0815C9.71394 13.0272 9.85259 13 10.0005 13C10.1484 13 10.287 13.0272 10.4164 13.0815C10.5458 13.1359 10.666 13.2174 10.7769 13.3261Z"
                                                fill="#1A191D"/>
                                        </svg>
                                    </SvgIcon>
                                </IconButton>}
                            </Box>
                        </Box>
                        {initialText() && <PDFButton onClick={() => {
                            downloadPDF(true)
                        }} icon_data={{icon: Adobe, position: 'end'}}>Download as PDF</PDFButton>}
                    </Box>
                    <Box className={cl.drag_container}>
                        <DragResizeContainer text={initialText()} fontSize={getFontSize()} minHeight={"10%"}
                                             maxHeight={"70%"}/>
                    </Box>
                </Box>
                <Box id={"gpt"} className={cl.gpt_context}>
                    {/*<Box className={cl.top_content}>*/}
                    <Box className={cl.gpt_buttons}>
                        {types.map(t => <Box key={t.id} onClick={() => changeActiveGpt(t.id)}
                                             className={[cl.gpt_button, selectedGpt === t.id ? cl.active : ""].join(" ")}>{t.name}</Box>)}
                    </Box>
                    <Box id={"gpt_text_content"} sx={{fontSize: getFontSize()}} className={cl.gpt_text}>
                        {gptText() ??
                            <Box sx={{display: "grid", placeContent: "center", width: "100%", height: "100%"}}>
                                This will show the general summary of the text above
                            </Box>
                        }
                    </Box>
                    {/*</Box>*/}
                    <Divider className={cl.divider}/>
                    <Box className={cl.gpt_buttons_bottom}>
                        <Box className={cl.left}>
                            <PDFButton loading={loadingStart()} disabled={disabledStart()} onClick={sendGPTReq}>Start</PDFButton>
                            {initialText() && <CustomSelector theme={'black'} data={['en', 'jp', 'ua', 'ru'] as Languages[]}
                                                              animationSide={AnimationSides.right}
                                                              onChangeValue={onChangeLanguage}/>}
                        </Box>
                        {initialText() && <PDFButton disabled={!gptText()} onClick={() => {
                            downloadPDF(false)
                        }} icon_data={{icon: Adobe, position: 'end'}}>Download as PDF</PDFButton>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainPage;