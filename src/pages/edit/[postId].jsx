import Head from "next/head";
import { EditContainer } from '../../containers/upload';

const EditPage = () => {

    return (
        <>
            <Head>
                <title>BinarGram - Edit Post</title>
            </Head>
            <EditContainer />
        </>
    )
};

export default EditPage;