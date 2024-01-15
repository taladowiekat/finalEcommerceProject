import React, { useContext } from 'react'
import Inputs from '../shared/Inputs.jsx';
import { useFormik } from 'formik';
import { loginSchema } from '../validation/validate.js';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UUser.jsx';

function Login() {
    const navigate=useNavigate();
    let {userToken,setUserToken} = useContext(UserContext)
    console.log(userToken)
    if(userToken){
        navigate(-1)
    }

    
    const initialValues = {
        email: '',
        password: '',
    };


    const onSubmit = async users => {
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,users)
        if (data.message == 'success') {
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
            formik.resetForm();
            // toast.success("login successfully", {
            //     position: 'buttom-center',
            //     autoClose: 5000,
            //     hideProggressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            navigate('/')

        }
    }


    const formik = useFormik({
        initialValues:initialValues,
        onSubmit,
        validationSchema: loginSchema,
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

            <h2 className='text-center'>login</h2>
            <form id='form' className='flex flex-col' onSubmit={formik.handleSubmit} >
                {renderInputs}
                <button className='btn' disabled={!formik.isValid}>login</button>
                <br/>
                <Link to="/sendCode">Forgot Password</Link>
            </form>


        </div>

    )
}

export default Login