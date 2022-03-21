import { useRouter } from "next/router";
import { getJwt } from "../../../helpers/auth";
import { callAPI } from "../../../helpers/network";
import { useHomeProvider } from "../HomeProvider";

const usePostItem = () => {
    const { push } = useRouter();
    const { loadPosts } = useHomeProvider();

    const handleRemove = async (postId) => {
        const confirmed = confirm('Are you sure you want to delete?');
        if (confirmed) {
            await callAPI({
                url: `/posts/${postId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            });
            await loadPosts();
            alert('Your post has been deleted.')
        }
    };

    const handleEdit = (postId) => push(`/edit/${postId}`);

    return {
        handleRemove,
        handleEdit
    }
};

export default usePostItem;