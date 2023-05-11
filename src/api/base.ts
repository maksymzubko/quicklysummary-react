import axios, {AxiosResponse} from 'axios';

const agent = axios.create({
    baseURL: process.env.VITE_API_QUICKLY
});

agent.interceptors.request.use(
    async (config: any) => {
        const token = localStorage.getItem('quickly_summary_token');
        if (token) {
            try {
                const data = JSON.parse(token);
                config.headers!.Authorization = `Bearer ${data.access_token.toString()}`;
            } catch (e) {
                localStorage.removeItem('quickly_summary_token');
            }
        }

        config.headers!['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

agent.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        const storageItem = localStorage.getItem('quickly_summary_token')

        if (error.response.status === 401 && storageItem) {
            if (!originalRequest._retry) {
                const jsonItem = JSON.parse(storageItem);
                let response: AxiosResponse<any, any>;

                try {
                    response = await agent.post('/auth/refresh', {token: jsonItem.access_token})
                } catch (e) {
                    localStorage.removeItem('quickly_summary_token')
                }

                if (response.status === 200 || response.status === 201) {
                    localStorage.setItem('quickly_summary_token', JSON.stringify(response.data));
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                    return agent.request(originalRequest);
                } else
                    localStorage.removeItem('quickly_summary_token')
            } else
                localStorage.removeItem('quickly_summary_token')
        }
        return Promise.reject(error);
    }
);

export default agent;
