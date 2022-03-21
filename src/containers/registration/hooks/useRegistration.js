import React from "react";
import { useState } from "react";
import { getJwt } from "../../../helpers/auth";
import { callAPI } from "../../../helpers/network";
import { useRouter } from "next/router";

const intialValues = {
    email: '',
    username: '',
    password: ''
}

const useRegistration = () => {
    const [loading, setLoading] = useState();
    const { push } = useRouter();

    const submit = async (values) => {
        setLoading(true);

        const formUser = new FormUser();

        const createAccount = await callAPI({
            url: '/users',
            method: 'POST',
            data: formUser,
            headers: {
                Authorization: `Bearer ${getJwt()};`
            }
        });        
    };

    return {
        loading,
        submit
    }
};

export default useRegistration;