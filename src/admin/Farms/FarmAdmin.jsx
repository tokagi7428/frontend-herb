import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllherbs } from '../../redux/actions/herbAction';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
function Farm() {
    const [farm, setFarm] = useState(null)
    const location = useLocation();
    const idFarm = location.pathname.split('/')
    const herbs = useSelector((state) => state.herb?.herbs)
    const dispatch = useDispatch()
    // console.log(idFarm[3])
    // console.log({ herbs })

    useEffect(() => {
        dispatch(getAllherbs())
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${idFarm[3]}`)
            // console.log("data : ", res.data.data)
            setFarm(res.data.data)
        }
        fetchData()
    }, [farm])

    const addHerbToFarm = async (herb) => {
        // console.log(herb)
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${idFarm[3]}/herb/`, herb)
        // console.log("edit : ", res)
    }
    const removeHerbToFarm = async (herbId) => {
        console.log(herbId)
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${idFarm[3]}/del/herb/`, { herbId })
        // console.log({ res })
    }
    let herbFilter = herbs ? herbs.filter(function (obj) {
        return !farm?.herbs.some(function (obj2) {
            return obj?._id == obj2?._id;
        });
    }) : null
    // console.log({ herbs })
    return (
        <div>
            <Helmet><title>จัดการแหล่งเพาะปลูก</title></Helmet>
            <div className="w-full my-2">
                <h1 className='text-center text-3xl my-5 font-bold text-emerald-500'>{farm?.name}</h1>
                <div className="lg:max-w-5xl md:max-w-2xl max-w-md mx-auto">
                    <button className='bg-amber-500 text-white py-2 px-4 rounded-md my-2'>
                        <Link to={`/farm/${idFarm[3]}#preview`} className="card_link">
                            Preview - {farm?.name}
                        </Link>
                    </button>
                    <div className="flex gap-5 lg:flex-row flex-col">
                        <div className="flex-1 border-2 rounded-md">
                            <h1 className='text-center text-xl m-1 text-emerald-600'>ลบสมุนไพร</h1>
                            {
                                farm?.herbs.length === 0
                                    ?
                                    <h1 className='text-red-400 text-center text-2xl mt-10 font-bold'>กรุณาเพิ่มสมุนไพรในแหล่งเพาะปลูก</h1>
                                    :
                                    farm?.herbs.map((item, i) => (
                                        <div className="flex items-center justify-between py-4 px-3 " key={i}>
                                            <h1>{item?.name}</h1>
                                            <button className='bg-red-400 text-white px-2 py-2 rounded-md' onClick={() => removeHerbToFarm(item?._id)}>ลบสมุนไพร</button>
                                        </div>
                                    ))
                            }
                        </div>
                        <div className="border-2 rounded-md flex-1">
                            <h1 className='text-center text-xl m-1 text-emerald-600'>เพิ่มสมุนไพร</h1>
                            {
                                herbFilter.length === 0 ?
                                    <h1 className='text-center text-red-400 mt-10 text-2xl font-bold'>ไม่มีสมุนไพร</h1>
                                    :
                                    herbFilter != null &&
                                    herbFilter.map((herb, i) => (
                                        <div className="flex items-center justify-between p-2" key={i}>
                                            <h1>{herb?.name}</h1>
                                            <button className='bg-green-400 text-white px-2 py-2 rounded-md' onClick={() => addHerbToFarm(herb)}>เพิ่มสมุนไพร</button>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Farm