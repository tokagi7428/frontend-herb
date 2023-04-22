import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getherb } from '../../redux/actions/herbAction'
import { useDispatch } from 'react-redux'
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from '../../redux/actions/fetchAction'
// import { FacebookIcon, FacebookShareButton, FacebookShareCount } from 'react-share'
import { toast } from 'react-toastify'
function HerbId() {
    const [herb, setHerb] = useState(null)
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname = location.pathname.split('/')
    const id = pathname[2]
    // console.log({ location, pathname, id })
    // console.log(`www.${window.location.hostname}/herb/${HerbId}`)
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(FETCH_REQUEST);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/herb/${id}`);
                // console.log("data : ", res.data.data)
                setHerb(res.data.data)
                // console.log({ herb })
            } catch (error) {
                toast.error(error)
            }
        };
        fetchData();
    }, [dispatch])

    useEffect(() => {

        createCountView()
    }, [])

    const createCountView = async () => {
        try {
            let ipAddress = await axios.get('https://api.ipify.org/?format=json')
            ipAddress = ipAddress.data.ip
            let type = "herb"
            return data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/statistics/countApi`, { did: id, ip: ipAddress, type });
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='bg-amber-200 py-10 -mb-20'>
            <Helmet><title>{herb?.name}</title></Helmet>
            <div className="relative lg:max-w-4xl sm:max-w-lg max-w-md my-2 mx-auto border-b-2 border-red-200 mb-3">
                <div className=" block md:flex">
                    <div className="p-4 flex-1">
                        <div className="flex gap-2">
                            <img src={herb?.image} className="w-[400px] mx-auto my-2 rounded-md" />
                        </div>
                        <div className="my-2 mb-4 ml-2">
                            <h1 className=''><strong className=' text-emerald-600 text-md'>ชื่อ </strong> : {herb?.name}</h1>
                            <h1 className=''><strong className=' text-emerald-600 text-md'>ชื่อวิทยาศาสตร์ </strong> : {herb?.nameScience}</h1>
                            <h1 className=''><strong className=' text-emerald-600 text-md'>ชื่ออื่นๆ </strong> : {herb?.otherName}</h1>
                            <h2><strong className=' text-emerald-600 text-md'>ราคา </strong > : {herb?.price} บาท/ขีด</h2>
                        </div>

                    </div>
                    <div className="p-3 flex-1 text-md">
                        <p className='my-2'><strong className=' text-emerald-400 text-xl'>ลักษณะทางพฤกษศาสตร์  </strong>: {herb?.desc}</p>
                        <hr />
                        <p className='my-2'><strong className=' text-emerald-600 text-md'>สรรพคุณ</strong> : {herb?.properties}</p>
                    </div>
                </div>
            </div>
            <h1 className='text-center text-emerald-700 text-2xl font-bold mb-4'>ส่วนต่างๆ ของ {herb?.name}</h1>
            <div className="bg-amber-200 py-2 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    {herb?.imageBlade && <img src={herb?.imageBlade} alt={herb?.name} className=' w-[500px] h-[300px] mx-auto rounded-md' />}
                    <div className="p-3 flex-1 text-md">
                        {herb?.descBlade && <p className='my-2'><strong className=' text-emerald-600 text-lg'>ลักษณะทางพฤกษศาสตร์ของใบ </strong>: {herb?.descBlade}</p>}
                        {herb?.propertiesBlade && <p className='my-2'><strong className=' text-emerald-600 text-lg'>สรรพคุณของใบ</strong> : {herb?.propertiesBlade}</p>}
                    </div>
                </div>
            </div>
            <div className="bg-amber-200 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    {herb?.imageBloom && <img src={herb?.imageBloom} alt={herb?.name} className=' w-[500px] h-[300px] mx-auto rounded-md' />}
                    <div className="p-3 flex-1 text-md">
                        {herb?.descBloom && <p className='my-2'><strong className=' text-emerald-600 text-lg'>ลักษณะทางพฤกษศาสตร์ของดอก </strong>: {herb?.descBloom}</p>}
                        {herb?.propertiesBloom && <p className='my-2'><strong className=' text-emerald-600 text-lg'>สรรพคุณของดอก</strong> : {herb?.propertiesBloom}</p>}
                    </div>
                </div>
            </div>
            <div className="bg-amber-200 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    {herb?.imageFruit && <img src={herb?.imageFruit} alt={herb?.name} className=' w-[500px] h-[300px] mx-auto rounded-md' />}
                    <div className="p-3 flex-1 text-md">
                        {herb?.descFruit && <p className='my-2'><strong className=' text-emerald-600 text-lg'>ลักษณะทางพฤกษศาสตร์ของผล </strong>: {herb?.descFruit}</p>}
                        {herb?.propertiesFruit && <p className='my-2'><strong className=' text-emerald-600 text-lg'>สรรพคุณของผล</strong> : {herb?.propertiesFruit}</p>}
                    </div>
                </div>
            </div>
            <div className="bg-amber-200 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    {herb?.imageRoot && <img src={herb?.imageRoot} alt={herb?.name} className=' w-[500px] h-[300px] mx-auto rounded-md' />}
                    <div className="p-3 flex-1 text-md">
                        {herb?.descRoot && <p className='my-2'><strong className=' text-emerald-600 text-lg'>ลักษณะทางพฤกษศาสตร์ของราก </strong>: {herb?.descRoot}</p>}
                        {herb?.propertiesRoot && <p className='my-2'><strong className=' text-emerald-600 text-lg'>สรรพคุณของราก</strong> : {herb?.propertiesRoot}</p>}
                    </div>
                </div>
            </div>
            {herb?.howToUse && <div className="bg-amber-200 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    <strong className=' text-emerald-600 text-lg'>วิธีใช้</strong>
                    {herb?.howToUse.split(',')?.map((item, idx) => (
                        <p key={idx}>{item}</p>
                    ))}
                </div>
            </div>}
            {herb?.reference && <div className="bg-amber-200 mt-10 mx-4">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto ">
                    <p><strong className=' text-emerald-600 text-lg'>แหล่งอ้างอิง</strong></p>
                    <div className="flex flex-col flex-wrap gap-2">
                        {herb?.reference.split(',')?.map((item, idx) => (
                            <a href={item} key={idx} className='text-blue-400 break-all'>{item}</a>
                        ))}
                    </div>
                </div>
            </div>}
            {/* <FacebookShareButton
                url={`www.${window.location.hostname}/herb/${HerbId}`}
                title={`${herb?.name}`}

            >
                <FacebookIcon />
            </FacebookShareButton> */}
        </div>
    )
}

export default HerbId