import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    posts: [],
    loading: false
}

const slices = createSlice({
    initialState,
    name: "home",
    reducers: {
        toogleLoading(state, action) {
            Object.assign(state, {
                ...state,
                loading: action.payload
            })
        },
        setPosts(state, action) {
            Object.assign(state, {
                ...state,
                posts: action.payload
            })
        }
    }
});

const { setPosts, toggleLoading } = slices.actions;

export const useHomeDispatcher = () => {
    const { home } = useSelector((state) => state);
    const dispatch = useDispatch();

    const makeLoading = (loading) => dispatch(toggleLoading(loading));
    const makePosts = (posts) => dispatch(setPosts(posts));

    return {
        home,
        makePosts,
        makeLoading
    }
};

export default slices.reducer;