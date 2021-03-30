import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
const baseURL = process.env.NODE_ENV==='development'?'http://localhost:5000':'http://121.41.225.12:5000';
const ins = axios.create({
    baseURL,
    timeout: 5000,
});

ins.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
        console.log(err.message);
        return {
            data: {
                data: err.message,
                ok: 0, //标志请求失败
            },
        };
    }
);


export { ins };