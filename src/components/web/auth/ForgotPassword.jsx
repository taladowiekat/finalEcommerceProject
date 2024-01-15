import React from 'react'
// import './register.css'
import Inputs from '../shared/Inputs.jsx';
import { useFormik } from 'formik';
import { forgotPasswordSchema } from '../validation/validate.js';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
        code:'',
    };

    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, users)
        if (data.message == 'success') {
            // toast("password updated , plz verify ur email to login", {
            //     position: 'buttom-center',
            //     autoClose: 5000,
            //     hideProggressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });

            navigate('/login')
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: forgotPasswordSchema,
    });

    const inputs = [
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            value: formik.values.email,
            name: 'email',
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            value: formik.values.password,
            name: 'password',
        },
        {
            id: 'code',
            type: 'text',
            placeholder: 'code',
            value: formik.values.code,
            name: 'code',
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Inputs
            type={input.type}
            key={index}
            placeholder={input.placeholder}
            id={input.id}
            value={input.value}
            onChange={  formik.handleChange||formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            name={input.name}
        />
    ));


    return (

        <div className="register mt-5 py-5">

            <h2 className='text-center'>Update password</h2>
            <form id='form' className='flex flex-col' onSubmit={formik.handleSubmit} encType='multipart/form-data' >
                {renderInputs}
                <button className='btn' disabled={!formik.isValid}>update</button>
            </form>


        </div>

    )
}

export default ForgotPassword