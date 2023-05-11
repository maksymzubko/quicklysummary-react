export interface TicketResponse {
    ticketFileText: string;

    gptFiles: GptResponseDto[];

    ticketName: string;

    ticketId: number;
}

export interface GptResponseDto {
    content: string;

    id: number;

    reqId: number;
}

export enum Languages {
    'ru' = 'ru',
    'en' = 'en',
    'ua' = 'ua',
    'jp' = 'jp',
}

export interface GptRequest {
    message: string;

    lang: Languages;

    ticketId: number;

    reqId: number;
}

export interface msgToGPT {
    en: string;
    ua: string;
    ru: string;
    jp: string;
}

export interface TypeResponse {
    name: string;

    isEditable: boolean;

    message: msgToGPT;

    id: number;
}