import axios from "axios";
import { toast } from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all
export const getAllFarms = createAsyncThunk(
    "farms/getFarms",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm`);
        const { message } = response
        toast.success(message)
        const { data } = response
        // console.log("data : ", data.data)
        return data.data;
    }
);
// export const getAllFarms = async () => {
//     try {
//         const res = await axios.get("https://mushy-colt-hosiery.cyclic.app//api/farm")
//         const { message } = res

//         return res.data
//     } catch (e) {
//         toast.error(e.message)
//     }
// }

// get a farm
export const getFarm = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${id}`)
        const { message } = res
        // console.log("res : ", res.data)
        toast.success(message)
        const { data } = res
        // console.log("data : ", data.data)
        return data.data
    } catch (e) {
        toast.error(e.message)
    }
}

// add
export const createFarm = async (datas) => {
    try {
        // console.log({ datas })
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/farm`, datas)
        // console.log({ res })
        const { message } = res.data
        toast.success(message)
        return res.data
    } catch (e) {
        toast.error(e.message)
    }
}

// edit
export const editFarm = async (id, datas) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/farm/edit/${id}`, datas)
        // console.log("updated : ", res)
        const { message } = res.data
        toast.success(message)
        return res.data
    } catch (e) {
        toast.error(e.message)
    }
}

// delete
export const deleteFarm = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${id}`)
        // console.log("deleted : ", res)
        const { message } = res.data
        toast.success(message)
    } catch (e) {
        toast.error(e.message)
    }
}