import React from 'react'
import { Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { registerUser } from '../../redux/actions/userAction'
import * as Yup from 'yup'
import FormLib from '../../components/formlib/FormLib';
import { connect } from "react-redux";

function Register({ registerUser, props: { setLoginActive, loginActive, toggleForm, setToggleForm } }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    toggleForm && <div className='flex flex-col relative overflow-hidden min-h-screen justify-center items-center'>
      <div className=" bg-white absolute transition-transform w-[500px] p-10 rounded-md overflow-hidden" style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
        {/* <div className=" w-[200px] bg-emerald-500 h-full absolute left-0 -top-48 -z-50 hue-rotate-90 rotate-45 rounded-full "></div>
        <div className=" w-[200px] bg-emerald-500 h-full absolute right-0 -bottom-48 -z-50  rotate-45 rounded-full "></div> */}
        <span className='absolute text-lg top-4 hover:font-bold hover:text-red-500 right-5 cursor-pointer font-semibold hover:bg-neutral-500 hover:px-2' onClick={() => setLoginActive(false)}>X</span>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password1: "",
            password2: ""
          }}
          validationSchema={
            Yup.object({
              email: Yup.string().trim().email("Invalid Email").required("required"),
              username: Yup.string().trim().required("required"),
              password1: Yup.string().trim().min(4, "password is too short").required('required'),
              password2: Yup.string().trim().oneOf([Yup.ref("password1")], "pass much match").required("required")
            })
          }
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log({ values })
            registerUser(values, navigate, redirect, setSubmitting, setFieldError)
          }}
        >
          <Form>
            <div className="flex justify-center">
              <img src={logo} alt="logo-login" className='w-24 -my-4 scale-150' />
            </div>
            <h1 className='text-center text-2xl py-2 font-bold my-3'>สมัครบัญชีผู้ใช้</h1>
            {/* <div className="text-center mb-2 ">
              คุณมีบัญชีผู้ใช้หรือยัง
              <button onClick={() => setToggleForm(false)} className='ml-2 text-red-500 hover:underline hover:text-blue-500'>
                เข้าสู่ระบบ ?
              </button>
            </div> */}
            <FormLib
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <FormLib
              name="username"
              type="username"
              placeholder="Enter your username"
            />
            <FormLib
              name="password1"
              type="password"
              placeholder="Enter your password1"
            />
            <FormLib
              name="password2"
              type="password"
              placeholder="Enter your password2"
            />
            <div className="flex justify-between">
              <button type='submit' className='mt-3 bg-emerald-600 py-2 px-4 text-white rounded-md hover:bg-emerald-500'>สมัครบัญชีผู้ใช้</button>
              <button onClick={() => setToggleForm(false)} className='mt-3 bg-amber-500 py-2 px-4 text-white rounded-md hover:bg-amber-500 flex hover:gap-2'>
                เข้าสู่ระบบ
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
          </Form>

        </Formik>
      </div>
    </div>
  )
}

export default connect(null, { registerUser })(Register)