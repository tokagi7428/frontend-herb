import axios from "axios";
import { sessionService } from "redux-react-session";
import { toast } from 'react-toastify'

export const loginUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmit

) => {
  // console.log({ credentials })
  try {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, credentials, {
      headers: {
        "Content-type": "application/json",
      }
    }).then((res) => {
      const { data } = res;
      // console.log({ data })
      if (data.status === "FAILED") {
        const { message } = data;
        toast.error(message);
        setFieldError("password", message)
      } else if (data.status === "SUCCESS") {
        toast.success("เข้าสู่ระบบสำเร็จ")
        // console.log("data : ", data.data);
        const userData = data.data;
        const token = userData.token;
        const userToken = localStorage.setItem("user-token", token)
        const keep_data = { ROLE: userData.role, TOKEN: token }
        const user = localStorage.setItem("user", JSON.stringify(keep_data))
        sessionService
          .saveSession(token)
          .then(() => {
            sessionService
              .saveUser(userData)
              .then(() => {
                navigate("/");
              })
          })
          .catch((err) => toast.error(err))
      }
      setSubmit(false)
    })
  } catch (error) {
    toast.error(error)
  }

}

export const registerUser = (
  credentials,
  navigate,
  redirect,
  setFieldError,
  setSubmit
) => {
  return () => {
    try {
      // console.log({ credentials })
      // console.log(process.env.BACKEND_URL)
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        const { data } = res
        // console.log({ res })
        // console.log("status", data)
        if (data.status === "FAILED") {
          const { message } = data;
          // console.log("message : ", message)

          // check error from backend
          if (message.includes("username")) {
            setFieldError("username", message)
          }
          if (message.includes("email")) {
            setFieldError("email", message)
          }
          if (message.includes("password")) {
            setFieldError("password", message)
          }
          toast.error(message)
          setSubmit(false)
        } else if (data.status === "SUCCESS") {
          // register success
          toast.success("Create account successfully")
          navigate('/login')
        }
      })



    } catch (err) {
      toast.error(err)
    }
  }
}

export const logoutUser = () => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
    localStorage.removeItem("user")
    localStorage.removeItem("user-token")
  }
}