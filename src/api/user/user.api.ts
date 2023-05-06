import { AxiosResponse } from 'axios';
import agent from '../base';
import {TicketResponse} from "./types";

class UserApi {

    async getTickets(): Promise<TicketResponse[]> {
        const response: AxiosResponse = await agent.get(
            `user/tickets`
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }

}

const userApi = new UserApi();
export default userApi;
