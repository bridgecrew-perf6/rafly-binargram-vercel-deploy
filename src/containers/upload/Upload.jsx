import AuthProvider from "../../providers/auth/AuthProvider";
import MainLayout from "../../components/layout/MainLayout";
import Button from "../../components/button";
import { useFormik, getIn } from "formik";
import * as Yup from 'yup';
import { CameraIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { callAPI } from "../../helpers/network";
import { getJwt, getUser } from "../../helpers/auth";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
    title: Yup.string().required(),
    caption: Yup.string().required(),
    files: Yup.mixed().required(),
});

const initialValues = {
    title: '',
    caption: '',
    files: null
}

const Upload = () => {
    const [loading, setLoading] = useState();
    const [preview, setPreview] = useState();
    const { push } = useRouter();

    const onSubmit = async (formValues) => {
        setLoading(true);
        // first upload

        const formData = new FormData();
        formData.append("files", formValues.files);

        const upload = await callAPI({
            url: "/upload",
            method: "post",
            data: formData,
            headers: {
                Authorization: `Bearer ${getJwt()}`
            }
        })

        const fileUrl = upload.data[0].url;
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
            url: "/posts",
            method: "POST",
            data: payload,
            headers: {
                Authorization: `Bearer ${getJwt()}`
            }
        });

        if (submitPost.status === 200) {
            setLoading(false);
            alert('Create posts success!');
            push("/");
        }
    };

    const {
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleChangeFile = (e) => {
        const files = e.target.files;
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
                            <div className="font-bold mb-1"> Title </div>
                            <input 
                                name="title"
                                type="text"
                                className="py-2 focus:ring-0 focus:outline-none border-b w-full"
                                placeholder="Type your post file"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                data-testId= "input-title"
                            />
                            {
                                touched && errors && touched.title && errors.title && (
                                    <div className="text-xs text-red-500 pb-3" data-testId= "error-title"> {errors.title} </div>
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
                                data-testId= "input-caption"
                            />
                            {
                                touched && errors && touched.caption && errors.caption && (
                                    <div className="text-xs text-red-500 pb-3" data-testId= "error-caption"> {errors.caption} </div>
                                )
                            }
                        </label>
                    </div>
                    <div className="p-3">
                        <Button type="submit" label={loading ? 'Please wait...' : 'Create post'} />
                    </div>
                </form>
            </MainLayout>
        </AuthProvider>
    )
}

export default Upload;