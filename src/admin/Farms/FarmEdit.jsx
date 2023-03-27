import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFarm, editFarm } from '../../redux/actions/farmAction'
import { FETCH_ERROR, FETCH_SUCCESS, FETCH_REQUEST } from '../../redux/actions/fetchAction'
import { connect } from "react-redux";
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

function FarmEdit({ farm, error, loading }) {
    const [name, setName] = useState("")
    const [image, setImage] = useState('')
    const [imageURLs, setImageURLs] = useState([])
    const [desc, setDesc] = useState("")
    const [address, setAddress] = useState("")
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log("data : ", farm)
    // console.log({ loading })
    // console.log({ error })
    window.addEventListener("beforeunload", function (event) {
        event.returnValue = ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // dispatch(FETCH_REQUEST);
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${id}`);
                // dispatch(FETCH_SUCCESS(data.data));
                setName(data.data.name)
                setDesc(data.data.desc)
                setImage(data.data.image)
                setAddress(data.data.address)
                setLat(data.data.lat)
                setLong(data.data.long)
                console.log("herb : ", data.data)
            } catch (error) {
                dispatch(FETCH_ERROR(error));
            }
        };
        fetchData();
    }, [dispatch])

    const handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "uploads"); // Replace the preset name with your own
            formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/ramkhamhaeng-university/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                setImage(fileURL)
                // console.log({ data });
            })
        });
    }

    const onEditFarm = (e) => {
        try {
            e.preventDefault();
            if (name === '' && image.length == 0 && desc === '' && address === '' && lat === '' && long === '') {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                return
            }
            // console.log({ name, image, desc, address, lat, long })
            editFarm(id, { name, image, desc, address, lat, long })
            navigate('/admin')
        } catch (e) {
            toast.error(e)
        }
    }
    return (
        <div className='relative w-full'>
            <Helmet><title>แก้ไขแหล่งเพาะปลูก</title></Helmet>
            <div className="lg:max-w-5xl md:max-w-3xl max-w-xl p-10 w-full mx-auto my-4 w-md shadow-xl rounded-xl border-2">
                <h1 className='text-center text-xl'>แก้ไขแหล่งเพาะปลูกเกษตรกร</h1>
                <div className="flex flex-col my-3">
                    <p className='mb-2'>ชื่อแหล่งเพาะปลูก</p>
                    <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} name="name" id='name' className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
                </div>
                <div className="flex flex-col my-3">
                    <p className='mb-2'>รูปภาพ</p>
                    <Dropzone onDrop={handleDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='w-full border-2 py-6 cursor-pointer' >
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className='text-red-500 text-center'>Uploads Here</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div className="flex">
                        <img src={image} alt="" width={"100px"} className="m-1" />
                    </div>
                </div>
                <div className="flex flex-col my-3">
                    <p className='mb-2'>คำอธิบาย</p>
                    <textarea rows={5} onChange={(e) => setDesc(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={desc} />
                </div>
                <div className="flex flex-col my-3">
                    <p className='mb-2'>ที่อยู่</p>
                    <textarea onChange={(e) => setAddress(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={address} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col my-3 ">
                        <p className='mb-2'>ละติจูด</p>
                        <input type="number" onChange={(e) => setLat(e.target.valueAsNumber)} name="lat" value={lat} className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
                    </div>
                    <div className="flex flex-col my-3 ">
                        <p className='mb-2'>ลองจิจูด</p>
                        <input type="number" onChange={(e) => setLong(e.target.valueAsNumber)} value={long} name="long" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
                    </div>
                </div>
                <button className='py-2 px-6 rounded-md bg-green-600 text-white hover:bg-green-700 ' type='submit' onClick={onEditFarm}>ยืนยันการแก้ไขข้อมูล</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        farm: state.farmReducers.farm,
        loading: state.farmReducers.loading,
        error: state.farmReducers.error
    }
}

export default connect(mapStateToProps)(FarmEdit)