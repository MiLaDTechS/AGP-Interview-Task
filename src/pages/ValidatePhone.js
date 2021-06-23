import { motion } from 'framer-motion'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { validatePhone } from '../store/authUser';

const ValidatePhone = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const schemaValidation = Yup.object().shape({
        phone: Yup.number().typeError('شماره همراه نامعتبر است').required('لطفا شماره همراه خود را وارد کنید')
    });
    const initialValues = { phone: '' };

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(validatePhone(values)).then(result => {
            history.replace('/validate-otp', { phone: values.phone })
        }).catch(error => {

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
            <Toaster />
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
                                className="px-3 py-2 rounded-lg font-thin text-xs focus:outline-none transition focus:ring-2 ring-1 ring-gray-400"
                                type="text"
                                name="phone"
                                placeholder="شماره موبایل خود را وارد کنید"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <div className="flex justify-between mt-4">
                                <button className="text-xs text-white focus:outline-none py-1.5 rounded-lg px-5 ml-3 transition bg-purple-700 active:bg-purple-900 w-9/12 disabled:opacity-80" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (<FaSpinner color="white" className="animate-spin mx-auto" fontSize="20px" />) : 'ارسال کد تایید'}
                                </button>
                                <button onClick={() => history.replace('/login')} style={{ color: '#8E44AD', borderColor: '#8E44AD' }} className="text-xs focus:outline-none py-1.5 rounded-lg px-3 border-2 w-3/12 transition active:" type="button" disabled={isSubmitting}>
                                    ورود
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

export default ValidatePhone
