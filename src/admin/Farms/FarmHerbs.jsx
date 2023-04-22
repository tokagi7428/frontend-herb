import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import Farm from './Farms/Farm'
import { deleteFarm, getAllFarms } from '../redux/actions/farmAction'
import { toast } from 'react-toastify'

function FarmHerbs() {
    const dispatch = useDispatch()
    // state.farm => fetchFarm
    const farms = useSelector((state) => state.farm.farms)
    const isLoading = useSelector((state) => state.farm.isLoading)
    const error = useSelector((state) => state.farm.error)
    // console.log({ farms, isLoading, error })
    useEffect(() => {
        dispatch(getAllFarms())
    }, [dispatch])

    const handleDelete = (id, name) => {
        // console.log("id : ", id)
        if (confirm(`คุณจะลบ ${name} นี้ใช่หรือไม่`)) {
            window.location.reload(false);
            deleteFarm(id)
            window.location.reload(true);
        }
    }
    return (
        <div className='relative w-full'>
            <Helmet>
                <title>แอดมิน</title>
            </Helmet>
            <div className="lg:max-w-5xl md:max-w-3xl max-w-xl p-10 w-full mx-auto my-4 w-md shadow-xl rounded-xl border-2">
                <div className="flex mr-4 align-middle">
                    <h1>เพิ่มที่อยู่แหล่งเพาะปลูก</h1>
                    <Link to="/FarmHerbs/farm/add" className='mx-4 py-2 px-6 rounded-md bg-green-600 text-white hover:bg-green-700 '>เพิ่มเกษตรกร</Link>
                </div>
                <hr className='my-6' />
                {
                    isLoading
                        ? <div>Loading</div>
                        : error
                            ?
                            <div>{error}</div>
                            :
                            <div className="">
                                {farms.map((farm) => {
                                    return (
                                        <div className="py-2 max-h-xl flex justify-between items-center" key={farm._id}>
                                            <div className="flex align-middle">
                                                <Link to={`/FarmHerbs/farm/${farm._id}`} className='text-sm mr-1 hover:text-blue-500 hover:underline'>{farm.name}</Link>
                                                <img src={`${farm.image[0]}`} alt="" width={50} />
                                            </div>
                                            <div className="flex">
                                                <Link to={`/admin/herb/edit/${farm._id}`} className="bg-amber-400 hover:bg-amber-500 text-white hover:text-red-500 py-2 px-4 rounded-md font-bold mx-2">แก้ไข</Link>
                                                <button onClick={() => handleDelete(farm._id, farm.name)} className="bg-red-400 hover:bg-red-500 text-white hover:text-red-800 py-2 px-4 rounded-md font-bold">ลบ</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                }
            </div>
        </div>
    )
}

export default FarmHerbs