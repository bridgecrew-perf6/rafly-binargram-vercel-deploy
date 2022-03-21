import React from "react";
import { useState, useEffect } from "react";
import { callAPI } from "../../../helpers/network";
import { getJwt } from "../../../helpers/auth";

const useHome = () => {
    const [posts, setPosts] = useState();

    const loadPosts = async () => {
        const response = await callAPI({
            url: "/posts",
            method: "get",
            params: {
                [`sort[createdAt]`]: 'desc'
            },
            headers: {
                Authorization: `Bearer ${getJwt()}`
            }
        });

        setPosts(response.data.data);
    }

    return {
        posts,
        loadPosts
    }
}

export default useHome;