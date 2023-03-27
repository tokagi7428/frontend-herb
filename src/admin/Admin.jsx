import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from "react-paginate";
import { Helmet } from 'react-helmet-async'
import { deleteFarm, getAllFarms } from '../redux/actions/farmAction'
import { deleteherb, getAllherbs } from '../redux/actions/herbAction'
import axios from 'axios';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
function Admin() {
    // pagination
    const [pageNumberHerb, setPageNumberHerb] = useState(0)
    const [pageNumberFarm, setPageNumberFarm] = useState(0)
    const [tab, setTab] = useState(0)
    const dispatch = useDispatch()
    // state.farm => fetchFarm
    const farms = useSelector((state) => state.farm.farms)
    const isLoading = useSelector((state) => state.farm.isLoading)
    const error = useSelector((state) => state.farm.error)
    const herbs = useSelector((state) => state.herb.herbs)
    const isLoadingHerbs = useSelector((state) => state.herb.isLoading)
    const errorHerbs = useSelector((state) => state.herb.error)
    // console.log({ herbs })
    // console.log({ farms, isLoading, error })
    // console.log({ herbs })
    useEffect(() => {
        dispatch(getAllFarms())
        dispatch(getAllherbs())
    }, [dispatch])

    const editApprove = async (id, approved, nameApi) => {
        console.log({ approved, id })
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/${nameApi}/${id}/edit/approved`, { id, approved })
            console.log("updated : ", res)
            const { message } = res.data
            toast.success(message)
            window.location.reload(true);
            return res.data
        } catch (e) {
            toast.error(e.message)
        }
    }

    const convertDate = (time) => {
        let date = new Date(time);
        let formatLocal = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit' });
        let updateTime = date.toTimeString().split(' ')[0];
        let updateDay = formatLocal.format(date)
        return updateDay + ' ' + updateTime;
    }

    const handleDeleteFarm = (id, name) => {
        Swal.fire({
            title: 'ยืนยันการลบข้อมูลหรือไม่!',
            html: `คุณต้องการลบ<span class="text-red-500"> ${name} </span>ใช่หรือไม่`,
            icon: 'success',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'blue',
            denyButtonText: 'ยกเลิก',
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('ลบสำเร็จ', '', 'success')
                window.location.reload(false);
                deleteFarm(id)
                window.location.reload(true);
            }
            // else if (result.isDenied) {
            //     Swal.fire('Changes are not saved', '', 'info')
            // }
        })
    }
    const confirmDeleteHerb = (id, name) => {
        Swal.fire({
            title: 'ยืนยันการลบข้อมูลหรือไม่!',
            html: `คุณต้องการลบ<span class="text-red-500"> ${name} </span>ใช่หรือไม่`,
            icon: 'success',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'blue',
            denyButtonText: 'ยกเลิก',
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(false);
                deleteherb(id)
                window.location.reload(true);
                Swal.fire('ลบสำเร็จ', '', 'success')
            }
            // else if (result.isDenied) {
            //     Swal.fire('Changes are not saved', '', 'info')
            // }
        })
    }
    // herb
    const herbsPerPage = 5;
    const pagesVisitedHerb = pageNumberHerb * herbsPerPage;
    const pageCountHerb = Math.ceil(herbs.length / herbsPerPage);
    const changeHerbPage = ({ selected }) => {
        setPageNumberHerb(selected);
    };
    // farm
    const farmsPerPage = 5;
    const pagesVisitedFarm = pageNumberFarm * farmsPerPage;
    const pageCountFarm = Math.ceil(farms.length / farmsPerPage);
    const changeFarmPage = ({ selected }) => {
        setPageNumberFarm(selected);
    };
    const active = 'py-2 bg-gray-500 text-white sm:px-4 flex gap-2 w-[250px] items-center'
    const notActive = 'py-2 flex gap-2 w-[300px] items-center'
    return (
        <div className='relative w-5xl flex md:flex-row flex-col '>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <div className="md:flex-col  lg:flex-col lg:justify-start md:justify-start justify-center flex-row flex flex-initial md:w-[250px] lg:w-[250px] w-full mt-4">
                <div className={tab == 0 ? active : notActive}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                    <button onClick={() => setTab(0)}>
                        แหล่งเพาะปลูก</button>
                </div><div className={tab == 1 ? active : notActive}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <button onClick={() => setTab(1)}>สมุนไพร</button>
                </div>

            </div>
            <div className="flex-1 bg-white">
                <div className="flex lg:flex-row flex-col">
                    {
                        tab == 0 &&
                        <div className="lg:max-w-5xl md:max-w-2xl max-w-xl p-10 w-full sm:mx-auto my-4 w-md shadow-2xl rounded-md border-2 lg:mr-2 mr-0">
                            <div className="flex justify-between items-center">
                                <h1>เพิ่มที่อยู่แหล่งเพาะปลูก</h1>
                                <Link to="/admin/farm/add" className='mx-2 py-2 flex items-center lg:px-4 px-2 rounded-md bg-green-600 text-white hover:bg-green-700 '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                    เพิ่มเกษตรกร</Link>
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
                                            <div className="overflow-x-auto relative">
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="py-3 px-6">ชื่อ</th>
                                                            <th scope="col" className="py-3 px-6">รูปภาพ</th>
                                                            <th scope="col" className="py-3 px-6">แก้ไขล่าสุด</th>
                                                            <th scope="col" className="py-3 px-6">แก้ไข</th>
                                                            <th scope="col" className="py-3 px-6">ลบ</th>
                                                            <th scope="col" className="py-3 px-6">อนุมัติหรือไม่</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {farms.slice(pagesVisitedFarm, pagesVisitedFarm + farmsPerPage).map((farm) => {

                                                            return (
                                                                <tr key={farm._id} className={farm.approved ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700 " : "bg-white opacity-25 border-b dark:bg-gray-800 dark:border-gray-700 "}>
                                                                    <td className="py-4 lg:px-6"><Link to={`/admin/farmAdmin/${farm._id}`} className='text-sm mr-1 hover:text-blue-500 hover:underline'>{farm.name}</Link></td>
                                                                    <td className="py-4 px-6"><img src={`${farm.image}`} alt="" width={50} /></td>
                                                                    <td className="py-4 lg:px-6 lg:w-[150px] w-[100px]">{convertDate(farm.updatedAt)}</td>
                                                                    <td className="mt-4 px-4 rounded-md flex mx-2 justify-center items-center bg-amber-400 hover:bg-amber-500 text-white hover:text-red-500 max-w-fit max-h-fit">
                                                                        <Link to={`/admin/farm/edit/${farm._id}`} className="flex items-center py-2 rounded-md font-bold">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                            <span>แก้ไข</span>
                                                                        </Link>
                                                                    </td>

                                                                    <td><button onClick={() => confirmDeleteHerb(farm._id, farm.name)} className="px-4 py-2 flex rounded-md justify-center items-center bg-red-500 hover:bg-red-800 text-white hover:text-red-500 max-w-fit max-h-fit" id="delete">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                        <span>ลบ</span>
                                                                    </button></td>
                                                                    <td className='flex justify-center items-center'>
                                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                                            <input type="checkbox" checked={farm.approved} value={farm.approved} onChange={() => editApprove(farm._id, !farm.approved, "farm")} className="sr-only peer" />
                                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {farms.length < 1 &&
                                                <ReactPaginate
                                                    breakLabel="..."
                                                    nextLabel={"หน้าถัดไป"}
                                                    previousLabel={"ก่อนหน้า"}
                                                    pageCount={pageCountFarm}
                                                    onPageChange={changeFarmPage}
                                                    containerClassName={"paginationBttns"}
                                                    previousLinkClassName={"previousBttn"}
                                                    nextLinkClassName={"nextBttn"}
                                                    disabledClassName={"paginationDisabled"}
                                                    activeClassName={"paginationActive"}
                                                />
                                            }
                                        </div>
                            }
                        </div>
                    }
                    {
                        tab == 1 && (
                            <div className="lg:max-w-5xl md:max-w-2xl max-w-xl p-10 w-full sm:mx-auto my-4 w-md shadow-2xl rounded-md border-2 lg:mr-2 mr-0">
                                <div className="flex justify-between items-center">
                                    <h1>เพิ่มสมุนไพร</h1>

                                    <Link to="/admin/herb/add" className='mx-4 flex items-center py-2 px-4 rounded-md bg-green-600 text-white hover:bg-green-700 '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        เพิ่มสมุนไพร</Link>
                                </div>
                                <hr className='my-6' />
                                {
                                    isLoadingHerbs
                                        ? <div>Loading</div>
                                        : errorHerbs
                                            ?
                                            <div>{errorHerbs}</div>
                                            :
                                            <div className="">
                                                <div className="overflow-x-auto relative">
                                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                            <tr>
                                                                <th scope="col" className="py-3 px-6 m-w-[500px]">ชื่อ</th>
                                                                <th scope="col" className="py-3 px-6">รูปภาพ</th>
                                                                <th scope="col" className="py-3 px-6">แก้ไขล่าสุด</th>
                                                                <th scope="col" className="py-3 px-6">แก้ไข</th>
                                                                <th scope="col" className="py-3 px-6">ลบ</th>
                                                                <th scope="col" className="py-3 px-6">อนุมัติหรือไม่</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            {herbs.slice(pagesVisitedHerb, pagesVisitedHerb + herbsPerPage).map((herb) => {
                                                                return (
                                                                    <tr key={herb._id} className={herb.approved ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700 " : "bg-white opacity-40 border-b dark:bg-gray-800 dark:border-gray-700 "}>
                                                                        <td className="py-4 lg:px-6"><Link to={`/herb/${herb._id}#preview`} className='text-sm mr-1 hover:text-blue-500 hover:underline'>{herb.name}</Link></td>
                                                                        <td className="py-4 px-6"><img src={`${herb.image}`} alt={herb.name} width={50} className=' max-h-10' /></td>
                                                                        <td className="py-4 lg:px-6 w-[150px] ">{convertDate(herb.updatedAt)}</td>
                                                                        <td className="mt-4 px-4 rounded-md flex mx-2 justify-center items-center bg-amber-400 hover:bg-amber-500 text-white hover:text-red-500 max-w-fit max-h-fit">
                                                                            <Link to={`/admin/herb/edit/${herb._id}`} className="flex items-center py-2 rounded-md font-bold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                                <span>แก้ไข</span></Link>
                                                                        </td>

                                                                        <td><button onClick={() => confirmDeleteHerb(herb._id, herb.name)} className="px-4 py-2 flex rounded-md justify-center items-center bg-red-500 hover:bg-red-800 text-white hover:text-red-500 max-w-fit max-h-fit" id="delete">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#999" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                            </svg>
                                                                            <span>ลบ</span>
                                                                        </button></td>
                                                                        <td className='flex justify-center items-center'>

                                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                                <input type="checkbox" checked={herb.approved} value={herb.approved} onChange={() => editApprove(herb._id, !herb.approved, "herb")} className="sr-only peer" />
                                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                            </label>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {herbs.length &&
                                                    <ReactPaginate
                                                        breakLabel="..."
                                                        nextLabel={"หน้าถัดไป"}
                                                        previousLabel={"ก่อนหน้า"}
                                                        pageCount={pageCountHerb}
                                                        onPageChange={changeHerbPage}
                                                        containerClassName={"paginationBttns"}
                                                        previousLinkClassName={"previousBttn"}
                                                        nextLinkClassName={"nextBttn"}
                                                        disabledClassName={"paginationDisabled"}
                                                        activeClassName={"paginationActive"}
                                                    />
                                                }

                                            </div>
                                }
                            </div>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default Admin