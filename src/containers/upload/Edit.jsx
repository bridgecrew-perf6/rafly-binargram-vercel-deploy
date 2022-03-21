import AuthProvider from "../../providers/auth/AuthProvider";
import MainLayout from "../../components/layout/MainLayout";
import Button from "../../components/button/Button";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CameraIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { callAPI } from "../../helpers/network";
import { getJwt, getUser } from "../../helpers/auth";
import { useRouter } from "next/router";
import { useUploadDispatcher } from "../../redux/reducers/upload/slice";

const validationSchema = Yup.object({
    title: Yup.string().required(),
    caption: Yup.string().required(),
    files: Yup.mixed().required()
});

const Edit = () => {

    const { query: { postId } } = useRouter();

    const [preview, setPreview] = useState();
    const { push } = useRouter();

    const { upload: { post, loading }, makePost, makeLoading } = useUploadDispatcher();

    const loadInitialData = async () => {

        try {
            await makePost(postId);
        } catch (error) {
            alert(error);
        }
    };

    const onSubmit = async (formValues) => {
        makeLoading(true);

        let fileUrl = '';
        if (preview.includes('uploads')) {
            fileUrl = formValues.files;
        } else {
            // first upload
            const formData = new FormData();
            formData.append("files", formValues.files);
        
            const upload = await callAPI({
                url: "/upload",
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${getJwt()}`
                }
            });
            fileUrl = upload.data[0].url;
        }

        const { title, caption } = formValues;

        const payload = {
            data: {
                title,
                caption,
                photo: `${fileUrl}`,
                isPublish: true,
                postedBy: `${getUser().username}`
            }
        }

        const submitPost = await callAPI({
            url: `/posts/${postId}`,
            method: "PUT",
            data: payload,
            headers: {
                Authorization: `Bearer ${getJwt()}`
            }
        });

        if (submitPost.status === 200) {
            makeLoading(false);
            alert('Update posts success!');
            push("/");
        }
    };

    useEffect(() => {
        if (postId) {
            loadInitialData();
        }
    }, [postId]);

    const initialValues = useMemo(() => {
        if (post && post.title) {
            return {
                ...post,
                files: post.photo,
            };
        }
        return {
            title: '',
            caption: '',
            files: null
        } 
    }, [post]);

    console.log (initialValues);

    // init preview
    useEffect(() => {
        if (post && post.photo) {
            setPreview(`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.photo}`);
        }
    }, [post]);

    const {
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        setFieldValue
    } = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleChangeFile = (e) => {
        const files = e.target.files;
        console.log(files);
        if (files) {
            setPreview(URL.createObjectURL(files[0]));
            setFieldValue("files", files[0]);
        }
    }

    return (
        <AuthProvider>
            <MainLayout>
                <form onSubmit={handleSubmit}>
                    <div className="h-60 bg-gray-100">
                        <label htmlFor="files" className="w-full h-full cursor-pointer flex justify-center items-center">
                            {
                                preview ? (
                                    <img className="h-full w-full object-cover" src={preview} />
                                ) : <CameraIcon className="h-8 w-8" /> 
                            }

                            <input
                                id="files"
                                type="file"
                                name="files"
                                className="hidden"
                                accept=".jpg, .png, .jpeg"
                                onChange={handleChangeFile}
                            />
                        </label>
                        <div className="text-center">
                            {
                                errors && errors.files && (
                                    <div className="text-xs text-red-500 pb-3"> {errors.files} </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="p-3">
                        <label htmlFor="title" className="block w-full mb-3">
                            <div className="font-bold mb-1 ">Title</div>
                            <input
                                name="title"
                                type="text"
                                className="py-2 focus:ring-0 focus:outline-none border-b w-full"
                                placeholder="Type your post title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={post.title}
                            />
                            {
                                touched && errors && touched.title && errors.title && (
                                    <div className="text-xs text-red-500 pb-3"> {errors.title} </div>
                                )
                            }
                        </label>
                    </div>
                    <div className="p-3">
                        <label htmlFor="caption" className="block w-full mb-3">
                            <div className="font-bold mb-1"> Caption </div>
                            <textarea
                                name="caption"
                                type="text"
                                className="py-2 focus:ring-0 focus:outline-none border-b w-full resize-none"
                                placeholder="Type your post caption"
                                rows={5}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={post.caption}
                            />
                            {
                                touched && errors && touched.caption && errors.caption && (
                                    <div className="text-xs text-red-500 pb-3"> {errors.caption} </div>
                                )
                            }
                        </label>
                    </div>
                    <div className="p-3">
                        <Button type="submit" label={loading ? 'Please wait...' : 'Update post'} />
                    </div>
                </form>
            </MainLayout>
        </AuthProvider>
    )
}

export default Edit;