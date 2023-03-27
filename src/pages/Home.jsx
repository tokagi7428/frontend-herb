import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFarms } from "../redux/actions/farmAction";
import { Link } from "react-router-dom";
import CarouselData from "../components/Carousel/CarouselData";
import { Helmet } from "react-helmet-async";

function Home() {
  const dispatch = useDispatch()
  const farms = useSelector((state) => state.farm.farms)
  const error = useSelector((state) => state.farm.error)
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [toggleHert, setToggleHeart] = useState(false)
  const keys = ["name", "address"]

  // console.log("Home : ", farms)
  useEffect(() => {
    dispatch(getAllFarms())
  }, [dispatch])

  const searchFilter = () => {
    let newFarm = farms.filter(farm => farm.approved != false)
    return search
      ? newFarm.filter((item) =>
        keys.some((key) =>
          typeof item[key] === "string"
            ? item[key].toLowerCase().includes(query.toLowerCase())
            : item["price"] >= Number(query)
        )
      )
      : newFarm;
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
    <div className='relative py-10 -mb-20 bg-navbarFont'>
      <div className="lg:max-w-5xl sm:max-w-2xl max-w-sm mx-auto my-4">
        <Helmet><title>หน้าแรก</title></Helmet>
        {/* <h1 className='text-center text-3xl mt-6 my-4 text-emerald-600 font-bold '>แหล่งเพาะปลูกทั้งหมด</h1> */}
        <CarouselData />
        <form className="flex items-center max-w-[500px] my-4 mt-8 ml-2 mx-auto">
          <label htmlFor="voice-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" onChange={handleQuery} id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="ค้นหาแหล่งเพาะปลูก" required />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <button type="button" onClick={() => setSearch(true)} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>ค้นหา
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {
            searchFilter().length === 0
              ?
              <h1 className="text-center text-red-400">ไม่พบข้อมูล</h1>
              :
              searchFilter().map((item, i) => (
                <section className="cards" key={i}>
                  <article className="card card--1 ">
                    <div className="card__info-hover flex justify-between ">
                      <div className="z-50 flex items-center">
                        <span onClick={() => setToggleHeart(false)} className={toggleHert ? 'text-[#f90606] card__like cursor-pointer scale-150 ml-1' : 'hidden'} title="like">❤</span>
                        <svg onClick={() => setToggleHeart(true)} className={toggleHert ? 'hidden' : 'card__like cursor-pointer'} viewBox="0 0 24 24">
                          <path fill="#f90606" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                        </svg>
                      </div>
                      <div className="-mb-4 text-[#AD7D52] z-50">
                        <Link to={`/map`} state={{ lat: item.lat, long: item.long, zoom: 13.5 }} className="flex items-center hover:gap-1 transition-all hover:bg-emerald-500 hover:p-2 hover:font-semibold hover:text-black">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span className="card__time hover:text-black">ดูแผนที่</span>
                        </Link>
                      </div>
                    </div>

                    <div className="card__img"></div>
                    <Link to={`/farm/${item?._id}`} className="card_link">
                      <div className="card__img--hover" style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
                    </Link>
                    <div className="card__info mt-2 py-2">
                      <span className="card__category"> สมุนไพรไทย </span>
                      <h3 className="card__title">{item.address}</h3>
                      <span className="card__by">ชื่อ <Link to={`/farm/${item?._id}`} className="card_name" title="ชื่อแหล่งเพาะปลูก">{item.name}</Link></span>
                    </div>
                  </article>
                </section>
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;