import axios from 'axios';

export const callAPI = async (payload) => {
    
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    try {
        const response = await axiosInstance(payload);
        return response;
    } catch (error) {
        Promise.reject(error);
    }
}