import Head from "next/head";
import AccountContainer from '../containers/account';

const AccountPage = () => {
    return (
        <>
            <Head>
                <title>BinarGram - Account</title>
            </Head>
            <AccountContainer />
        </>
    )
}

export default AccountPage;