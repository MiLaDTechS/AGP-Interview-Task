import { motion } from 'framer-motion'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login } from '../store/authUser';
import { Toaster } from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const schemaValidation = Yup.object().shape({
        phone: Yup.number().typeError('شماره همراه نامعتبر است').required('لطفا شماره همراه خود را وارد کنید'),
        password: Yup.string().required('لطفا رمز عبور خود را وارد کنید')
    });
    const initialValues = { phone: '', password: '' };

    const handleSubmit = (values, { setSubmitting }) => {

        dispatch(login(values)).then(result => {
            history.replace('/');
        }).catch(error => {
            // console.log(error)
        }).finally(() => {
            setSubmitting(false);
        });

    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
            <Toaster toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: 12
                },
            }} position="top-left" />
            <div className="h-screen flex flex-col justify-center items-center">

                <Formik
                    initialValues={initialValues}
                    validationSchema={schemaValidation}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col w-full px-4">
                            <input
                                className="px-3 py-2 rounded-lg font-thin text-xs mb-3 focus:outline-none transition focus:ring-2 ring-1 ring-gray-400"
                                type="text"
                                name="phone"
                                placeholder="شماره موبایل خود را وارد کنید"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <input
                                className="px-3 py-2 rounded-lg font-thin text-xs focus:outline-none focus:ring-2 transition ring-1 ring-gray-400"
                                type="password"
                                name="password"
                                placeholder="رمز عبور خود را وارد کنید"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <div className="flex justify-between mt-4">
                                <button className="text-xs text-white focus:outline-none py-1.5 rounded-lg ml-2 transition bg-purple-700 active:bg-purple-900 w-2/3 disabled:opacity-80" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (<FaSpinner color="white" className="animate-spin mx-auto" fontSize="20px" />) : 'ورود به حساب'}
                                </button>
                                <button style={{ color: '#8E44AD', borderColor: '#8E44AD' }} className="text-xs focus:outline-none py-1.5 rounded-lg border-2 transition w-1/3" type="button" onClick={() => history.replace('/validate-phone')} disabled={isSubmitting}>
                                    ثبت نام
                                </button>
                            </div>
                            <div className="mt-4">
                                <div className="text-center text-red-500 mb-1" style={{ fontSize: 10 }}>
                                    {errors.phone && touched.phone && errors.phone}
                                </div>
                                <div className="text-center text-red-500" style={{ fontSize: 10 }}>
                                    {errors.password && touched.password && errors.password}
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </motion.div>
    )
}

export default Login
