export interface TicketResponse {
    ticketFileText: string;

    gptFiles: GptResponseDto[];

    ticketName: string;

    ticketId: number;
}

export interface GptResponseDto {
    content: string;

    id: number;
}