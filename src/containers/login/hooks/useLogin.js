import React from "react";
import { useState } from "react";
import { callAPI } from "../../../helpers/network";

const useLogin = () => {
    const [loading, setLoading] = useState();
    const submit = async (values) => {
        
        const response = await callAPI({
            url: '/auth/local',
            method: 'POST',
            data: values,
        });
        const { data } = response;

        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href = '/';

    };

    return {
        loading,
        submit,
    }
};

export default useLogin;