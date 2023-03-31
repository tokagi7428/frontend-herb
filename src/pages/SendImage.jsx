import { useState, useRef } from "react";

const SendImage = ({ imageRef }) => {
    const [streaming, setStreaming] = useState(null); // streaming state
    const inputImageRef = useRef(null); // video input reference
    console.log({ imageRef })
    // closing image


    return (
        <div className="btn-container">
            {/* Image Handler */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const url = URL.createObjectURL(e.target.files[0]); // create blob url
                    imageRef.current.src = url; // set video source
                    imageRef.current.style.display = "block"; // show video
                    setStreaming("image"); // set streaming to video
                }}
                ref={inputImageRef}
                className='bg-white w-full file:hover:bg-slate-700 file:bg-black file:py-[6.5px] file:text-white' placeholder="ค้นหาสมุนไพร"
            />
            <span className="absolute right-2 bottom-2 text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </span>
        </div>
    );
};

export default SendImage;
