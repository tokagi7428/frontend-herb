import axios from "axios";
import { toast } from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getAllherbs = createAsyncThunk(
    "herbs/getHerbs",
    async () => {
        // console.log("api : ", import.meta.env.VITE_BACKEND_URL)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/herb`);
        // const { message } = respons
        // toast.success(message)
        return response.data.data;
    }
);

// get all
// export const getAllherbs = async () => {
//     try {
//         const res = await axios.get("https://mushy-colt-hosiery.cyclic.app//api/herb")
//         const { message } = res
//         toast.success(message)
//         return res.data
//     } catch (e) {
//         toast.error(e.message)
//     }
// }

// get a herb
export const getherb = async (id) => {
    try {
        const res = await axios.get(`https://mushy-colt-hosiery.cyclic.app//api/herb/${id}`)
        // console.log({ res })
        // const { message } = res
        // toast.success(message)
        return res.data
    } catch (e) {
        toast.error(e.message)
    }
}

// add
export const createherb = async (datas) => {
    try {
        console.log({ datas })
        const res = await axios.post(`https://mushy-colt-hosiery.cyclic.app//api/herb/`, datas)
        const { message } = res.data
        toast.success(message)
        return res.data.data
    } catch (e) {
        toast.error(e.message)
    }
}

// edit
export const editherb = async (id, datas) => {
    try {
        const res = await axios.put(`https://mushy-colt-hosiery.cyclic.app//api/herb/${id}`, datas)
        console.log("updated : ", res)
        const { message } = res.data
        toast.success(message)
    } catch (e) {
        toast.error(e.message)
    }
}

// delete
export const deleteherb = async (id) => {
    try {
        const res = await axios.delete(`https://mushy-colt-hosiery.cyclic.app//api/herb/${id}`)
        console.log("deleted : ", res)
        const { message } = res
        toast.success(message)
    } catch (e) {
        toast.error(e.message)
    }
}