import axios, { AxiosInstance } from 'axios';

/**
 * this class is a sigleton class. singleton classes only
 * create one intance of the class through out the lifetime
 * of application
 */
class Axios {
    constructor() {}

    private static _instance: AxiosInstance;
    
    /**
     * see https://www.npmjs.com/package/axios
     * for more details
     */
    public static getInstance(): AxiosInstance {
        if(this._instance) {
            return this._instance
        }

        this._instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            timeout: 1000,
        });

        return this._instance;
    }
}

export default Axios;
