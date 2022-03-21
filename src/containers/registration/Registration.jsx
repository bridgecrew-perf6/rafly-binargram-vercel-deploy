import Input from '../../components/input';
import Button from '../../components/button';
import { NoAuthProvider } from '../../providers/auth';
import { useFormik, getIn } from "formik";
import { Title, SubTitle } from '../../components/typography';
import * as Yup from 'yup';
import { useRegisterDispatcher } from '../../redux/reducers/registration';

const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    username: Yup.string().required(),
    password: Yup.string().required()
});

const initialValues = {
    email: "",
    username: "",
    password: ""
}

const RegistrationContainer = () => {
    const { register, loading, doRegister } = useRegisterDispatcher();

    const onSubmit = async (values) => {        

        try {
            const payload = {
                identifier: values.email,
                username: values.username,
                password: values.password
            };
            await doRegister(payload);
            window.location.href = "/";
        } catch (error) {
            alert(error);
        }
    }

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <NoAuthProvider>
            <main className="w-full text-gray-700 h-screen flex flex-col space-y-3
            justify-center items-center">
                <div className="max-w-md">
                    <div className="w-full py-5">
                        <Title text="Sign Up Here!" />
                        <Title />
                        <SubTitle content="Lorem ipsum dolor sit amet consectetur adipisicing." />
                    </div>
                    <form className="w-full border p-5 rounded-2xl" onSubmit={handleSubmit}>

                        <Input
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Your Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {
                            getIn(touched, "username") && getIn(errors, "username") && (
                                <div className="text-sm text-red-500 -mt-3 font-semibold pb-3"> {getIn(errors, "username") } </div>
                            )
                        }

                        <Input
                            name="email"
                            label="Email"
                            type="text"
                            placeholder="your@gmail.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {
                            getIn(touched, "email") && getIn(errors, "email") && (
                                <div className="text-sm text-red-500 font-semibold -mt-3 pb-3"> {getIn(errors, "email")} </div>
                            )
                        }

                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Your Secret Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {
                            getIn(touched, "password") && getIn(errors, "password") && (
                                <div className="text-sm text-red-500 font-semibold -mt-3 pb-3"> {getIn(errors, "password")} </div>
                            )
                        }

                        <Button type="submit" label={loading ? 'Please wait' : 'Create your account'} />
                    </form>
                </div>
            </main>
        </NoAuthProvider>
    )
}

export default RegistrationContainer;
