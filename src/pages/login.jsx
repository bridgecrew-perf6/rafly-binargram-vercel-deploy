import Head from "next/head";
import LoginContainer from "../containers/login";

const LoginPage = () => {
    return (
        <>
            <Head>
                <title>Sign In - BinarGram</title>
            </Head>
            <LoginContainer />
        </>
    )
};

export default LoginPage;