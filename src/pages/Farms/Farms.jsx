import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from '../../redux/actions/fetchAction'
import { toast } from 'react-toastify'
function Farms() {
    const [farm, setFarm] = useState(null)
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState(false);
    const keys = ["name"]
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname = location.pathname.split('/')
    const id = pathname[2]
    // console.log({ location, pathname, id })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(FETCH_REQUEST);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm/${id}`);
                // console.log("data : ", res.data.data)
                setFarm(res.data.data)

            } catch (error) {
                toast.error(error)
            }
        };
        fetchData();
    }, [dispatch])
    console.log({ farm })
    const searchFilter = () => {
        return search
            ? farm?.herbs.filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
            )
            : farm?.herbs;
    };

    const handleQuery = (e) => {
        const query = e.target.value;
        if (query === "") {
            setSearch(false);
            setQuery("");
        } else {
            setQuery(query);
        }
    };

    return (
        <div>
            <Helmet><title>{farm?.name}</title></Helmet>
            <div className="relative lg:max-w-4xl sm:max-w-lg max-w-md my-2 mx-auto">

                <div className=" block md:flex">
                    <div className="p-4 flex-1">
                        <div className="flex gap-2">
                            <img src={farm?.image} className="w-[400px] mx-auto my-2" />
                        </div>
                        <div className="my-2 mb-4">
                            <h1 className=''>ชื่อ : {farm?.name}</h1>
                            <h1>ที่อยู่ <span>{farm?.address}</span></h1>

                        </div>

                        <Link className="bg-emerald-600 hover:bg-green-500 p-2 text-white" to={`/map`} state={{ lat: farm?.lat, long: farm?.long, zoom: 16 }} >ดูแผนที่</Link>

                    </div>
                    <div className="p-3 flex-1 text-md">
                        <p className='my-2'>อธิบาย : {farm?.desc}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className=" py-2 md:mt-10">
                <div className="lg:max-w-4xl sm:max-w-xl max-w-md mx-auto">
                    <h1 className="my-4 text-2xl text-emerald-600">รายชื่อสมุนไพร</h1>
                    <div className="grid sm:grid-cols-2 grid-cols-1">
                        {

                            farm?.herbs.map((item, i) => (
                                <div key={i} className="m-2 flex items-center gap-5">
                                    <img src={item?.image} width={"100px"} className=' max-h-20' />
                                    <p className='hover:text-blue-400'><Link to={`/herb/${item?._id}`} >{item?.name}</Link></p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Farms