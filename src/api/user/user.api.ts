import {AxiosResponse} from 'axios';
import agent from '../base';
import {GptRequest, GptResponseDto, TicketResponse, TypeResponse} from "./types";

class UserApi {

    async getTickets(): Promise<TicketResponse[]> {
        const response: AxiosResponse = await agent.get(
            `tickets`
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

    async getTypes(): Promise<TypeResponse[]> {
        const response: AxiosResponse = await agent.get(
            `gpt/types`
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

    async uploadFile(data: FormData): Promise<TicketResponse> {
        const response: AxiosResponse = await agent.post(
            `tickets/upload`,
            data,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

    async sendRequest(data: GptRequest): Promise<GptResponseDto[]> {
        const response: AxiosResponse = await agent.post(
            `gpt/send-gpt-request`,
            data
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

    async deleteTicket(id: number): Promise<boolean> {
        const response: AxiosResponse = await agent.delete(
            `tickets/${id}`,
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

    async renameTicket(id: number, name: string): Promise<boolean> {
        const response: AxiosResponse = await agent.post(
            `tickets/rename-ticket/${id}`,
            {name}
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

}

const userApi = new UserApi();
export default userApi;
