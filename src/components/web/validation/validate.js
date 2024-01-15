import * as yup from 'yup';
export const registerSchema=yup.object  ({
    userName:yup.string().required("username is required").min(3,"must be at least 3 char").max(30,"max is 30 characters"),
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 characters")
  })

export const loginSchema=yup.object({
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 characters")
})


export const sendCodeSchema=yup.object({
  email:yup.string().required("email is required").email(),
})

export const forgotPasswordSchema=yup.object  ({
  code:yup.string().required("code is required").length(4,"4 characters"),
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"max is 30 characters")
})

export const reviewSchema = yup.object({
    comment: yup.string().required('Comment is required'),
    rating: yup.number().required('Rating is required').min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  });