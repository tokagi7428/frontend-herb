import axios from 'axios'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

function SendImage() {
    const [image, setImage] = useState('')
    const submitForm = async () => {
        if (!image) return
        console.log({ image })
        const res = await axios.post(`${import.meta.env.VITE_YOLO_URL}`, { image })
        // const res = await axios.post('http://127.0.0.1:5000/api/predict', { image })
        console.log({ res })
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
            })
        });
    }
    return (
        <div>
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
            <button onClick={submitForm}>submit</button>
        </div>
    )
}

export default SendImage