import React, { useState, useEffect } from 'react'
import { createFarm } from '../../redux/actions/farmAction'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function FarmAdd() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState('')
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const navigate = useNavigate()

  const onCreateFarmx = (e) => {
    e.preventDefault();
    if (name === '' && image.length == 0 && desc === '' && address === '' && lat === '' && long === '') {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }
    createFarm({ name, image, desc, address, lat, long })
    navigate("/admin")
  }
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

  return (
    <div className='relative w-full'>
      <Helmet><title>แหล่งเพาะปลูกแหล่งเพาะปลูก</title></Helmet>
      <div className="lg:max-w-5xl md:max-w-3xl max-w-xl p-10 w-full mx-auto my-4 w-md shadow-xl rounded-xl border-2">
        <h1 className='text-center text-xl'>แหล่งเพาะปลูกแหล่งเพาะปลูก</h1>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ชื่อแหล่งเพาะปลูก</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' required />
        </div>
        <div className="flex flex-col my-3">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} required />
                  <p className='text-red-500 text-center'>Uploads Here</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={image} alt="not fount" width={"100px"} className="m-1" required />}
          </div>
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>คำอธิบาย</p>
          <textarea onChange={(e) => setDesc(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={desc} required />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ที่อยู่</p>
          <textarea onChange={(e) => setAddress(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={address} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col my-3 ">
            <p className='mb-2'>ละติจูด</p>
            <input type="number" onChange={(e) => setLat(e.target.valueAsNumber)} name="lat" value={lat} className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' required />
          </div>
          <div className="flex flex-col my-3 ">
            <p className='mb-2'>ลองจิจูด</p>
            <input type="number" onChange={(e) => setLong(e.target.valueAsNumber)} value={long} name="long" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' required />
          </div>
        </div>
        <button className='py-2 px-6 rounded-md bg-green-600 text-white hover:bg-green-700' type='submit' onClick={onCreateFarmx}>ยืนยันการเพิ่มข้อมูล</button>
      </div>
    </div>
  )
}

export default FarmAdd