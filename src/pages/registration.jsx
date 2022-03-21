import Head from "next/head";
import RegistrationContainer from "../containers/Registration";

const RegistrationPage = () => {
    return (
        <>
            <Head>
                <title> Sign Up </title>
            </Head>
            <RegistrationContainer />
        </>
    )
};

export default RegistrationPage;