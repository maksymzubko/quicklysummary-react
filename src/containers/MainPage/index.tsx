import React, {LegacyRef, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Box, Divider, IconButton, SvgIcon} from "@mui/material";
import cl from './style.module.css'
import Sidebar from "./Sidebar/index";
import Adobe from './assets/adobe-acrobat-dc-logo-2020-1 1.svg'
import PDFButton from "../../components/Button/PDFButton/index";
import DragResizeContainer from "../../components/DragResizeContainer/index";
import CustomSelector, {AnimationSides} from "../../components/CustomSelector";
import {useDispatch, useSelector} from "react-redux";
import {SelectStatuses, SelectTickets} from "../../redux/store/manager/selector";
import userApi from "../../api/user/user.api";
import {
    addGPTResponse,
    addOrUpdateGptResponse,
    addStatus,
    addTicket,
    setTickets,
    updateStatus
} from "../../redux/store/manager/slice";
import {GptRequest, Languages, TypeResponse} from "../../api/user/types";
import {v4 as uuidv4} from "uuid";
import {AlertType} from "react-mui-dropzone";
import {SnackbarKey, useSnackbar} from "notistack";
import {jsPDF} from "jspdf";
import HeaderContext from "../../contexts/headerContext";
import CustomPrompt from "../../components/CustomPromt/index";
import {useTranslation} from "react-i18next";
import {messages} from "../../languages/messages";
import IconBtn from "../../components/IconButton";
import {Scrollbars} from "react-custom-scrollbars";

const MainPage = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const tickets = useSelector(SelectTickets)
    const statuses = useSelector(SelectStatuses)
    const dispatch = useDispatch()

    const [promptText, setPromptText] = useState("")
    const {promptOpened, setPromptOpened} = useContext(HeaderContext)
    const [gptLanguage, setGptLanguage] = useState<Languages>(Languages.en)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [scale, setScale] = useState(100)
    const [selectedGpt, setSelectedGpt] = useState(null)
    const [types, setTypes] = useState<TypeResponse[]>([])
    const [loadingList, setLoadingList] = useState([])

    const containerRef = useRef<Scrollbars>(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const {t} = useTranslation();

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
        setScale(scale > 25 ? scale - 25 : scale)
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
        if (id === 6) {
            setPromptOpened(true)
        }
    }

    const scrollLeft = () => {
        if (containerRef.current) {
            const values = containerRef.current.getValues()
            containerRef.current.scrollLeft(values.scrollLeft - 100); // Adjust the scroll distance as needed

            if (rightRef.current)
                rightRef.current.style.display = "flex"
            if (leftRef.current) {
                if (values.left <= 0.2)
                    leftRef.current.style.display = "none"
                else
                    leftRef.current.style.display = "flex"
            }

        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const values = containerRef.current.getValues()
            containerRef.current.scrollLeft(values.scrollLeft + 100); // Adjust the scroll distance as needed
            if (rightRef.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if (values.left >= 0.8)
                    rightRef.current.style.display = "none"
                else
                    rightRef.current.style.display = "flex"
            }
            if (leftRef.current)
                leftRef.current.style.display = "flex"
        }
    };

    const onChangeTicket = (id: number) => {
        setSelectedGpt(types[0].id);
        setSelectedTicket(id);
    }

    const initialText = useCallback(() => {
        return tickets.find(i => i.ticketId === selectedTicket)?.ticketFileText;
    }, [selectedTicket, tickets])

    const gptText = useCallback(() => {
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
        const selectedType = types.find(t => t.id === selected);
        const name = `${ticketName}[${selectedType.name}]`;

        const list = selected === 2 ? [1, 2] : [selected]
        setLoadingList(prev => [...prev, ...list]);

        dispatch(addStatus({status: {id: id, name, status: "In process"}}))

        const data = {
            reqId: selected,
            lang: Languages[gptLanguage],
            message: selected !== 6 ? selectedType.message[gptLanguage] : `${promptText}\n\n<<SUMMARY>>`,
            ticketId: selectedTicket
        } as GptRequest;

        userApi.sendRequest(data).then(res => {
            dispatch(addOrUpdateGptResponse({id: selectedTicket, gpt: res}))
            dispatch(updateStatus({status: {id: id, name, status: "Done"}}))
        }).catch(err => {
            onAlert(err?.response?.data?.message[0], "error")
            dispatch(updateStatus({status: {id: id, name, status: "Error"}}))
        }).finally(() => setLoadingList(prev => [...prev.filter(p => !list.includes(p))]))
    }

    const onAlert = (message: string, variant: AlertType) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const key: SnackbarKey = enqueueSnackbar(message, {variant: variant, onClick: () => closeSnackbar(key)})
    }

    const downloadPDF = (initialText = false) => {
        const doc = new jsPDF();
        const ticket = tickets.find(t => t.ticketId === selectedTicket);
        const gpt = ticket.gptFiles.find(g => g.reqId === selectedGpt);
        // const text = initialText ? document.getElementById("initial_text_content").innerText : document.getElementById("gpt_text_content").innerText;
        const text = initialText ? ticket.ticketFileText : gpt.content;

        doc.text(text, 10, 10, {maxWidth: 200});
        const selectedType = types.find(t => t.id === selectedGpt);
        const ticketName = ticket.ticketName.replace(".txt", "");
        const name = `${initialText ? ticketName : `${ticketName}[${selectedType.name}]`}.pdf`

        doc.save(name);
    }

    const disabledStart = useCallback(() => {
        if (selectedGpt === 6) return promptText.length < 4;

        const text = tickets.find(i => i.ticketId === selectedTicket)
            ?.gptFiles.find(g => g.reqId === selectedGpt)?.content;

        if (selectedTicket === null || selectedGpt === null)
            return true;
        if (text)
            return true;

        return false;
    }, [selectedTicket, selectedGpt, tickets, promptText])

    const loadingStart = useCallback(() => {
        return loadingList.includes(selectedGpt)
    }, [selectedTicket, selectedGpt, loadingList])

    const handleChangePrompt = (value: string) => {
        setPromptText(value)
    }

    const getName = (id: number) => {
        switch (id) {
            case 1:
                return t(messages.main.summary())
            case 2:
                return t(messages.main.sentences())
            case 3:
                return t(messages.main.keywords())
            case 4:
                return t(messages.main.p_mentioned())
            case 5:
                return t(messages.main.i_discussed())
            case 6:
                return t(messages.main.custom())
        }
    }

    return (
        <Box className={[cl.container].join(' ')}>
            <CustomPrompt opened={promptOpened} onClose={() => setPromptOpened(false)} onChange={handleChangePrompt}
                          value={promptText}/>
            <Sidebar onSelectTicket={onChangeTicket} statuses={statuses} tickets={tickets}/>
            <Box id={"content"} className={[cl.content, !initialText() ? cl.disabled : ''].join(' ')}>
                <Box style={{height: "50%"}} id={"text"} className={cl.text_reader}>
                    <Box className={cl.reader_actions}>
                        <Box className={cl.left_side}>
                            <Box className={cl.scale}>{scale}%</Box>
                            <Box className={cl.buttons}>
                                <IconBtn onClick={scaleUp}>
                                    <SvgIcon viewBox={"0 0 32 32"}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="white"/>
                                            <rect width="20" height="20" transform="translate(6 6)" fill="white"/>
                                            <path
                                                d="M21 16.8317H16.8334V20.9984C16.8334 21.2194 16.7456 21.4313 16.5893 21.5876C16.433 21.7439 16.221 21.8317 16 21.8317C15.779 21.8317 15.567 21.7439 15.4108 21.5876C15.2545 21.4313 15.1667 21.2194 15.1667 20.9984V16.8317H11C10.779 16.8317 10.567 16.7439 10.4108 16.5876C10.2545 16.4313 10.1667 16.2194 10.1667 15.9984C10.1667 15.7774 10.2545 15.5654 10.4108 15.4091C10.567 15.2528 10.779 15.165 11 15.165H15.1667V10.9984C15.1667 10.7774 15.2545 10.5654 15.4108 10.4091C15.567 10.2528 15.779 10.165 16 10.165C16.221 10.165 16.433 10.2528 16.5893 10.4091C16.7456 10.5654 16.8334 10.7774 16.8334 10.9984V15.165H21C21.221 15.165 21.433 15.2528 21.5893 15.4091C21.7456 15.5654 21.8334 15.7774 21.8334 15.9984C21.8334 16.2194 21.7456 16.4313 21.5893 16.5876C21.433 16.7439 21.221 16.8317 21 16.8317Z"
                                                fill="#1A191D"/>
                                        </svg>
                                    </SvgIcon>
                                </IconBtn>
                                <IconBtn onClick={scaleDown}>
                                    <SvgIcon viewBox={"0 0 32 32"}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="white"/>
                                            <rect width="20" height="20" transform="translate(6 6)" fill="white"/>
                                            <path
                                                d="M21 16.8317H11C10.779 16.8317 10.567 16.7439 10.4108 16.5876C10.2545 16.4313 10.1667 16.2194 10.1667 15.9984C10.1667 15.7774 10.2545 15.5654 10.4108 15.4091C10.567 15.2528 10.779 15.165 11 15.165H21C21.221 15.165 21.433 15.2528 21.5893 15.4091C21.7456 15.5654 21.8334 15.7774 21.8334 15.9984C21.8334 16.2194 21.7456 16.4313 21.5893 16.5876C21.433 16.7439 21.221 16.8317 21 16.8317Z"
                                                fill="#1A191D"/>
                                        </svg>
                                    </SvgIcon>
                                </IconBtn>
                                {scale !== 100 && <IconBtn onClick={reset}>
                                    <SvgIcon viewBox={"0 0 32 32"}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="white"/>
                                            <rect width="20" height="20" transform="translate(6 6)" fill="white"/>
                                            <path
                                                d="M15.2231 12.6739L12.3391 9.84783C11.9879 9.50362 11.9095 9.10978 12.104 8.6663C12.2984 8.22283 12.6449 8.00072 13.1433 8H18.8557C19.3549 8 19.7017 8.2221 19.8962 8.6663C20.0907 9.11051 20.0119 9.50435 19.6599 9.84783L16.776 12.6739C16.665 12.7826 16.5449 12.8641 16.4155 12.9185C16.2861 12.9728 16.1474 13 15.9995 13C15.8516 13 15.713 12.9728 15.5836 12.9185C15.4542 12.8641 15.334 12.7826 15.2231 12.6739Z"
                                                fill="#1A191D"/>
                                            <path
                                                d="M16.7769 19.3261L19.6609 22.1522C20.0121 22.4964 20.0905 22.8902 19.896 23.3337C19.7016 23.7772 19.3551 23.9993 18.8567 24L13.1443 24C12.6451 24 12.2983 23.7779 12.1038 23.3337C11.9093 22.8895 11.9881 22.4957 12.3401 22.1522L15.224 19.3261C15.335 19.2174 15.4551 19.1359 15.5845 19.0815C15.7139 19.0272 15.8526 19 16.0005 19C16.1484 19 16.287 19.0272 16.4164 19.0815C16.5458 19.1359 16.666 19.2174 16.7769 19.3261Z"
                                                fill="#1A191D"/>
                                        </svg>
                                    </SvgIcon>
                                </IconBtn>}
                            </Box>
                        </Box>
                        {initialText() && <PDFButton onClick={() => {
                            downloadPDF(true)
                        }} icon_data={{icon: Adobe, position: 'end'}}>{t(messages.buttons.downloadPdf())}</PDFButton>}
                    </Box>
                    <Box className={cl.drag_container}>
                        <DragResizeContainer text={initialText()} fontSize={getFontSize()} minHeight={"10%"}
                                             maxHeight={"70%"}/>
                    </Box>
                </Box>
                <Box id={"gpt"} className={cl.gpt_context}>
                    <Box className={cl.gpt_buttons_wrapper}>
                        <Box className={cl.gpt_buttons}>
                            {/*<Box className={cl.arrows}>*/}
                            <IconBtn ref={leftRef} onClick={scrollLeft} className={cl.arrow}>
                                <SvgIcon viewBox={"0 0 32 32"}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="16" fill="none"/>
                                        <path d="M19.125 25.1L10.7 16.7C10.6 16.6 10.529 16.4917 10.487 16.375C10.445 16.2584 10.4243 16.1334 10.425 16C10.425 15.8667 10.4457 15.7417 10.487 15.625C10.5283 15.5084 10.5993 15.4 10.7 15.3L19.125 6.87502C19.3583 6.64169 19.65 6.52502 20 6.52502C20.35 6.52502 20.65 6.65002 20.9 6.90002C21.15 7.15002 21.275 7.44169 21.275 7.77502C21.275 8.10836 21.15 8.40002 20.9 8.65002L13.55 16L20.9 23.35C21.1333 23.5834 21.25 23.871 21.25 24.213C21.25 24.555 21.125 24.8507 20.875 25.1C20.625 25.35 20.3333 25.475 20 25.475C19.6667 25.475 19.375 25.35 19.125 25.1Z" fill="black"/>
                                    </svg>
                                </SvgIcon>
                            </IconBtn>
                            <IconBtn ref={rightRef} onClick={scrollRight} className={cl.arrow}>
                                <SvgIcon viewBox={"0 0 32 32"}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="16" transform="rotate(-180 16 16)" fill="none"/>
                                        <path d="M12.875 6.89997L21.3 15.3C21.4 15.4 21.471 15.5083 21.513 15.625C21.555 15.7416 21.5757 15.8666 21.575 16C21.575 16.1333 21.5543 16.2583 21.513 16.375C21.4717 16.4916 21.4007 16.6 21.3 16.7L12.875 25.125C12.6417 25.3583 12.35 25.475 12 25.475C11.65 25.475 11.35 25.35 11.1 25.1C10.85 24.85 10.725 24.5583 10.725 24.225C10.725 23.8916 10.85 23.6 11.1 23.35L18.45 16L11.1 8.64997C10.8667 8.41664 10.75 8.12897 10.75 7.78697C10.75 7.44497 10.875 7.14931 11.125 6.89997C11.375 6.64997 11.6667 6.52497 12 6.52497C12.3333 6.52497 12.625 6.64997 12.875 6.89997Z" fill="black"/>
                                    </svg>
                                </SvgIcon>
                            </IconBtn>
                            {/*</Box>*/}
                            <Scrollbars ref={containerRef} autoHeight={true} autoHeightMin={45}>
                                <Box className={cl.btn_content}>
                                    {types.map(t => <Box key={t.id} onClick={() => changeActiveGpt(t.id)}
                                                         className={[cl.gpt_button, selectedGpt === t.id ? cl.active : ""].join(" ")}>{getName(t.id)}</Box>)}
                                </Box>
                            </Scrollbars>
                        </Box>
                    </Box>
                    {/*<Box className={cl.top_content}>*/}
                    <Scrollbars autoHide={true} autoHeightMin={42}>
                        <Box id={"gpt_text_content"} sx={{fontSize: getFontSize()}} className={cl.gpt_text}>
                            {gptText() ??
                                <Box sx={{display: "grid", placeContent: "center", width: "100%", height: "100%"}}>
                                    {t(messages.main.showSummary())}
                                </Box>
                            }
                        </Box>
                    </Scrollbars>
                    {/*</Box>*/}
                    <Divider className={cl.divider}/>
                    <Box className={cl.gpt_buttons_bottom}>
                        <Box className={cl.left}>
                            <PDFButton loading={loadingStart()} disabled={disabledStart()}
                                       onClick={sendGPTReq}>{t(messages.buttons.start())}</PDFButton>
                            {initialText() &&
                                <CustomSelector theme={'black'} data={['en', 'jp', 'ua', 'ru'] as Languages[]}
                                                animationSide={AnimationSides.right}
                                                onChangeValue={onChangeLanguage}/>}
                        </Box>
                        {initialText() && <PDFButton disabled={!gptText()} onClick={() => {
                            downloadPDF(false)
                        }} icon_data={{icon: Adobe, position: 'end'}}>{t(messages.buttons.downloadPdf())}</PDFButton>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainPage;