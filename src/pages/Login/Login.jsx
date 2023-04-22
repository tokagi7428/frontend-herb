import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import FormLib from '../../components/formlib/FormLib';
import { loginUser } from '../../redux/actions/userAction';
import Register from '../Register/Register.jsx'
function Login({ loginUser, loginActive, setLoginActive, user }) {
  const navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(false);
  // console.log({ user })
  if (user) {
    setLoginActive(false)
  }
  return (
    loginActive && <div className=' fixed top-0 left-0 bottom-0 right-0 bg-bgShadow bg-blend-darken overflow-auto' style={{ zIndex: 9999 }}>
      {/* <Helmet>
        <title>ลงชื่อเข้าใช้งาน</title>
      </Helmet> */}
      <div className="absolute transition-transform w-[500px] p-10 rounded-md text-navbarFont1 bg-white" style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
        <span className='absolute text-lg top-4 hover:font-bold hover:text-red-500 right-5 cursor-pointer' onClick={() => setLoginActive(false)}>X</span>
        <div className="flex justify-center">
          <img src={logo} alt="logo-login" className='w-24 -my-4 scale-150' />
        </div>
        <h1 className='text-center text-2xl py-2 font-bold my-3'>เข้าสู่ระบบ</h1>

        {/* <div className="text-center mb-2 ">
          คุณมีบัญชีผู้ใช้หรือยัง
          <button onClick={() => setToggleForm(true)} className='ml-2 text-red-500 hover:underline hover:text-blue-500'>
            สมัครบัญชี ?
          </button>
        </div> */}

        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={
            Yup.object({
              username: Yup.string().trim().required("กรุณากรอกอีเมลล์"),
              password: Yup.string().trim().required("กรุณากรอกรหัสผ่าน")
            })
          }
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            // console.log({ values })
            loginUser(values, navigate, setSubmitting, setFieldError)
          }}
        >
          <Form>
            <FormLib
              name="username"
              type="username"
              placeholder="Enter your username"
            />
            <FormLib
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <div className="flex justify-between align-middl">
              <div className="">
                <input type="checkbox" name="" id="" />
                <span className='ml-3 items-center'>จดจำฉัน</span>
              </div>
              <span className='items-center hover:text-red-600 cursor-pointer' title='ลืมรหัสผ่าน'>ลืมรหัสผ่าน</span>
            </div>
            <div className="flex justify-between align-middle">
              <button type="submit" className='mt-3 bg-emerald-600 py-2 px-4 text-white rounded-md hover:bg-emerald-500'>เข้าสู่ระบบ</button>
              <button onClick={() => setToggleForm(true)} className='mt-3 bg-amber-500 py-2 px-4 text-white rounded-md hover:bg-amber-500 flex hover:gap-2'>
                สมัครบัญชี
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Register props={{ setLoginActive, loginActive, toggleForm, setToggleForm }} />
    </div>
  )
}

export default connect(null, { loginUser })(Login)