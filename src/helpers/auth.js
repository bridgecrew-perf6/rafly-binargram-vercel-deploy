export const getJwt = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("jwt");
    }
    return null;
};

export const getUser = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("user"));
    }
    return null;
}