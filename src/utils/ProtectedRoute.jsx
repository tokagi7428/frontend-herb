import React, { useEffect, useState } from 'react'
import { Route, redirect, useNavigate } from 'react-router-dom'

function ProtectedRoute(props) {
    const navigate = useNavigate()
    const [isLoginAuthenicate, setIsLoginAuthenicate] = useState(false)
    const checkAuthen = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user != null || user?.ROLE == 'admin' || user?.ROLE == "herbalist") {
            setIsLoginAuthenicate(true)
        } else {
            setIsLoginAuthenicate(false)
            navigate('/')
        }
    }

    useEffect(() => {
        checkAuthen()
    })
    return (
        <React.Fragment>
            {
                isLoginAuthenicate ? props.children : <div className="text-center text-red-500 mt-5 bg-red-300 py-4 text-lg font-bold"><h2>คุณไม่มีสิทธิ์เข้าถึง</h2></div>
            }
        </React.Fragment>
    )
}

export default ProtectedRoute