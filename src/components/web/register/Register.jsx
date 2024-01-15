import React from 'react'
import Inputs from '../shared/Inputs.jsx';
import { useFormik } from 'formik';
import { registerSchema } from '../validation/validate.js';
// import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './register.module.css';
function Register() {

    // const { register, handleSubmit, watch, formState: { errors } } = useForm()
    // const onSubmit = data => console.log(data);

    // console.log(watch('username'));
    const initialValues = {
        userName: '',
        email: '',
        password: '',
        image:null
    };

    const handelFiled = event => {

        formik.setFieldValue('image', event.target.files[0]);
    }
    const onSubmit = async users => {
        const formData = new FormData();
        formData.append("userName", users.userName);

        formData.append("email", users.email);

        formData.append("password", users.password);

        formData.append("image", users.image);

        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData)
        if (data.message == 'success') {
            formik.resetForm();
            // toast("acc created successfully , plz verify ur email to login", {
            //     position: 'buttom-center',
            //     autoClose: 5000,
            //     hideProggressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });


        }
    }
    // const onSubmit = values => {
    //     console.log(values);
    // }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema,
    });

    const inputs = [
        {
            id: 'userName',
            type: 'text',
            placeholder: 'Username',
            value: formik.values.userName,
            name: 'userName',
        },
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
            id: 'image',
            type: 'file',
            placeholder: 'Image',
            name: 'image',
            onChange: handelFiled
        }
    ];

    const renderInputs = inputs.map((input, index) => (
        <Inputs
            type={input.type}
            key={index}
            placeholder={input.placeholder}
            id={input.id}
            value={input.value}
            onChange={formik.handleChange || formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            name={input.name}
        />
    ));

    return (
        <div className={styles.register}>
            <h2 className={styles.heading}>Register</h2>
            <form
                id='form'
                className={`flex flex-col ${styles.form}`}
                onSubmit={formik.handleSubmit}
                encType='multipart/form-data'
            >
                {renderInputs}
                <button className={`btn ${styles.submitBtn}`} disabled={!formik.isValid}>
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default Register