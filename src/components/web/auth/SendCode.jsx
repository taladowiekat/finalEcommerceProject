import React, { useContext } from 'react'
import Inputs from '../shared/Inputs.jsx';
import { useFormik } from 'formik';
import { sendCodeSchema } from '../validation/validate.js';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UUser.jsx';

function SendCode() {
    const navigate=useNavigate();

    const initialValues = {
        email: '',
    };


    const onSubmit = async users => {
        const { data } = await axios.patch(`https://ecommerce-node4.vercel.app/auth/sendcode`,users)
        if (data.message == 'success') {
            localStorage.setItem("userToken", data.token);
           // setUserToken(data.token);
            formik.resetForm();
            // toast.success("sendeing successfully", {
            //     position: 'buttom-center',
            //     autoClose: 5000,
            //     hideProggressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            navigate('/forgotPassword');

        }
    }


    const formik = useFormik({
        initialValues:initialValues,
        onSubmit,
        validationSchema: sendCodeSchema,
    });

    const inputs = [
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            value: formik.values.email,
            name: 'email',
        }
    ];

    const renderInputs = inputs.map((input, index) => (
        <Inputs
            type={input.type}
            key={index}
            placeholder={input.placeholder}
            id={input.id}
            value={input.value}
            onChange={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            name={input.name}
        />
    ));


    return (

        <div className="register mt-5 py-5">

            <h2 className='text-center'>Send Code</h2>
            <form id='form' className='flex flex-col' onSubmit={formik.handleSubmit} >
                {renderInputs}
                <button className='btn' disabled={!formik.isValid}>Send</button>
            </form>


        </div>

    )
}

export default SendCode