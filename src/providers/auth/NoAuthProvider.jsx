import React from "react";
import { useEffect, useState } from "react";
import { getJwt } from "../../helpers/auth";

const NoAuthProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const jwt = getJwt();
        if (jwt) {
            window.location.href = '/';
        }
        setMounted(true);
    }, []);

    if (mounted) {
        return children
    }

    return <></>
};

export default NoAuthProvider;