import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getJwt } from "../../../helpers/auth";
import { callAPI } from "../../../helpers/network";

const initialState = {
    loading: false
};

const slices = createSlice({
    initialState,
    name: "register",
    reducers: {
        toggleLoading(state, action) {
            Object.assign(state, {
                ...state,
                loading: action.payload
            })
        }
    }
});

const { toggleLoading } = slices.actions;

export const useRegisterDispatcher = () => {
    const { register } = useSelector((state) => state);
    const dispatch = useDispatch();

    const doRegister = async (values) => {
        dispatch(toggleLoading(true));

        const response = await callAPI({
            url: `/users`,
            method: 'POST',
            data: values,
            headers: {
                Authorization: `Bearer ${getJwt()}`
            }
        });

        const { data } = response;

        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch(toggleLoading(false));
    };

    return {
        register,
        doRegister
    }
}

export default slices.reducer;