import React, { useState, useEffect } from 'react'
import { createherb } from '../../redux/actions/herbAction'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function HerbAdd() {
  const [name, setName] = useState("")
  const [nameScience, setNameScience] = useState("")
  const [otherName, setotherName] = useState("")
  const [image, setImage] = useState('')
  const [imageBlade, setImageBlade] = useState('')
  const [imageBloom, setImageBloom] = useState('')
  const [imageFruit, setImageFruit] = useState('')
  const [imageRoot, setImageRoot] = useState('')
  const [price, setPrice] = useState([])
  const [shortProperties, setShortProperties] = useState('')
  const [properties, setProperties] = useState('')
  const [propertiesBlade, setPropertiesBlade] = useState('')
  const [propertiesBloom, setPropertiesBloom] = useState('')
  const [propertiesFruit, setPropertiesFruit] = useState('')
  const [propertiesRoot, setPropertiesRoot] = useState('')
  const [desc, setDesc] = useState('')
  const [descBlade, setDescBlade] = useState('')
  const [descBloom, setDescBloom] = useState('')
  const [descFruit, setDescFruit] = useState('')
  const [descRoot, setDescRoot] = useState('')
  const [howToUse, setHowToUse] = useState('')
  const [reference, setReference] = useState('')
  const navigate = useNavigate()

  const onCreateFarmx = (e) => {
    e.preventDefault();
    if (name == '' || nameScience == '' || image == '' || desc == '' || properties == '' || price == '' || shortProperties == '') {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }
    console.log({ name, nameScience, otherName, image, imageBlade, imageBloom, imageFruit, desc, descBlade, descBloom, descFruit, properties, propertiesBlade, propertiesBloom, propertiesFruit, price, howToUse, reference })
    e.preventDefault();
    createherb({ name, nameScience, otherName, image, imageBlade, imageBloom, imageFruit, imageRoot, desc, descBlade, descBloom, descFruit, descRoot, properties, propertiesBlade, propertiesBloom, propertiesFruit, propertiesRoot, price, howToUse, reference, shortProperties })
    navigate("/admin")
  }
  const handleDropImage = files => {
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
  const handleDropImageBlade = files => {
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
        setImageBlade(fileURL)
        // console.log({ data });
      })
    });
  }
  const handleDropImageBloom = files => {
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
        setImageBloom(fileURL)
        // console.log({ data });
      })
    });
  }
  const handleDropImageFruit = files => {
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
        setImageFruit(fileURL)
        // console.log({ data });
      })
    });
  }
  const handleDropImageRoot = files => {
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
        setImageRoot(fileURL)
        // console.log({ data });
      })
    });
  }

  return (
    <div className='relative w-full'>
      <Helmet>
        <title>เพิ่มสมุนไพร</title>
      </Helmet>
      <div className="lg:max-w-5xl md:max-w-3xl max-w-xl p-10 w-full mx-auto my-4 w-md shadow-xl rounded-xl border-2">
        <h1 className='text-center text-xl'>เพิ่มสมุนไพร</h1>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ชื่อสมุนไพร<span className='text-red-600'> *</span></p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ชื่อวิทยาศาสตร์<span className='text-red-600'> *</span></p>
          <input type="text" value={nameScience} onChange={(e) => setNameScience(e.target.value)} name="nameScience" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ชื่ออื่น (ถ้ามี)</p>
          <input type="text" value={otherName} onChange={(e) => setotherName(e.target.value)} name="otherName" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
        </div>
        <div className="flex flex-col my-3 ">
          <p className='mb-2'>ราคา (ขีด)<span className='text-red-600'> *</span></p>
          <input type="number" onChange={(e) => setPrice(e.target.valueAsNumber)} value={price} name="long" className='border p-2 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณย่อ<span className='text-red-600'> *</span></p>
          <textarea onChange={(e) => setShortProperties(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={shortProperties} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>รูปภาพสมุนไพร<span className='text-red-600'> *</span></p>
          <Dropzone onDrop={handleDropImage} >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='text-red-500 text-center'>คลิกที่นี่</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={image} alt="not fount" width={"100px"} className="m-1" />}
          </div>
        </div>
        {/* blade */}
        <div className="flex flex-col my-3">
          <p className='mb-2'>รูปภาพสมุนไพร (ใบ)</p>
          <Dropzone onDrop={handleDropImageBlade} >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='text-red-500 text-center'>คลิกที่นี่</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={imageBlade} alt="not fount" width={"100px"} className="m-1" />}
          </div>
        </div>
        {/* Bloom */}
        <div className="flex flex-col my-3">
          <p className='mb-2'>รูปภาพสมุนไพร (ดอก)</p>
          <Dropzone onDrop={handleDropImageBloom} >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='text-red-500 text-center'>คลิกที่นี่</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={imageBloom} alt="not fount" width={"100px"} className="m-1" />}
          </div>
        </div>
        {/* Fruit */}
        <div className="flex flex-col my-3">
          <p className='mb-2'>รูปภาพสมุนไพร (ผล)</p>
          <Dropzone onDrop={handleDropImageFruit} >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='text-red-500 text-center'>คลิกที่นี่</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={imageFruit} alt="not fount" width={"100px"} className="m-1" />}
          </div>
        </div>
        {/* Fruit */}
        <div className="flex flex-col my-3">
          <p className='mb-2'>รูปภาพสมุนไพร (ราก)</p>
          <Dropzone onDrop={handleDropImageRoot} >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full border-2 py-6 cursor-pointer' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='text-red-500 text-center'>คลิกที่นี่</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex">
            {image && <img src={imageRoot} alt="not fount" width={"100px"} className="m-1" />}
          </div>
        </div>

        <div className="flex flex-col my-3">
          <p className='mb-2'>ลักษณะทางพฤกษศาสตร์<span className='text-red-600'> *</span></p>
          <textarea onChange={(e) => setDesc(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={desc} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ลักษณะทางพฤกษศาสตร์ (ใบ)</p>
          <textarea onChange={(e) => setDescBlade(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={descBlade} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ลักษณะทางพฤกษศาสตร์ (ดอก)</p>
          <textarea onChange={(e) => setDescBloom(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={descBloom} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ลักษณะทางพฤกษศาสตร์ (ผล)</p>
          <textarea onChange={(e) => setDescFruit(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={descFruit} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>ลักษณะทางพฤกษศาสตร์ (ราก)</p>
          <textarea onChange={(e) => setDescRoot(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' name='desc' value={descRoot} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณ<span className='text-red-600'> *</span></p>
          <textarea onChange={(e) => setProperties(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={properties} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณ(ใบ)</p>
          <textarea onChange={(e) => setPropertiesBlade(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={propertiesBlade} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณ(ดอก)</p>
          <textarea onChange={(e) => setPropertiesBloom(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={propertiesBloom} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณ(ผล)</p>
          <textarea onChange={(e) => setPropertiesFruit(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={propertiesFruit} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>สรรพคุณ(ราก)</p>
          <textarea onChange={(e) => setPropertiesRoot(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={propertiesRoot} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>วิธีใช้</p>
          <textarea onChange={(e) => setHowToUse(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={howToUse} />
        </div>
        <div className="flex flex-col my-3">
          <p className='mb-2'>แหล่งอ้างอิง</p>
          <textarea onChange={(e) => setReference(e.target.value)} className='border p-3 outline-none focus:border-2 focus:border-green-400 placeholder:font-semibold' value={reference} />
        </div>
        <button className='py-2 px-6 rounded-md bg-green-600 text-white hover:bg-green-700' type='submit' onClick={onCreateFarmx}>ยืนยันการเพิ่มข้อมูล</button>
      </div>
    </div>
  )
}

export default HerbAdd