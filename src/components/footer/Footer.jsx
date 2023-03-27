import React, { useState } from 'react'

function Footer() {
    const [scrollDown, setScollDown] = useState(0);
    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    window.onscroll = () => {
        setScollDown(window.pageYOffset)
        return () => (window.onscroll = null);
    };
    // console.log(scrollDown)
    return (
        <div className='mt-20 relative scroll-smooth'>
            <div className="bg-gradient-to-bl from-narbarBg to-narbarBg3 text-center text-white py-10">
                <div>
                    <div className="mb-10">
                        <p>ติดตามเรา</p>
                        <ul className='flex justify-center gap-4 m-2'>
                            <li className='hover:underline hover:text-red-500'>Facebook</li>
                            <li className='hover:underline hover:text-red-500'>Line</li>
                            <li className='hover:underline hover:text-red-500'>Twitter</li>
                            <li className='hover:underline hover:text-red-500'>Instagram</li>
                        </ul>
                        <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={backToTop} className={scrollDown > 200 ? ' inline-block p-5 bg-narbarBg2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-narbarBg1 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out fixed mb-0 bottom-24 right-8' : 'hidden mb-96 transition'} id="btn-back-to-top">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
                        </button>
                    </div>
                </div>
                <hr />
                <p className='mt-4'>Copyright 2566 - Tanatip - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer