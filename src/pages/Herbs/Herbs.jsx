import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllherbs } from '../../redux/actions/herbAction'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async";
import topgraphic from '../../assets/images/topgraphic.png'
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import { detectImage } from "../../utils/detect.js"
import axios from 'axios'
import SendImage from '../SendImage'
function Herbs() {
  const dispatch = useDispatch()
  const herbs = useSelector((state) => state.herb.herbs)
  const [toggleHert, setToggleHeart] = useState(false)
  const [image, setImage] = useState('')
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [statusInput, setStatusInput] = useState("text")
  const [close, setClose] = useState(false)
  const keys = ["name"]

  // load and get models yolo
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  // references
  const imageRef = useRef(null);
  const imageRef1 = useRef(null);
  const canvasRef = useRef(null);
  const [classesName, setClassesName] = useState([])
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape
  // model configs
  const modelName = "herb";
  const classThreshold = 0.2;

  useEffect(() => {
    // console.log("herb : ", `${window.location.origin}/${modelName}_web_model/model.json`)
    tf.ready().then(async () => {
      const herb = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model
      console.log({ herb })
      // warming up model
      const dummyInput = tf.ones(herb.inputs[0].shape);
      const warmupResult = await herb.executeAsync(dummyInput);
      tf.dispose(warmupResult); // cleanup memory
      tf.dispose(dummyInput); // cleanup memory

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: herb,
        inputShape: herb.inputs[0].shape,
      }); // set model & input shape
    });
  }, []);
  const closeImage = () => {
    setClose(false)
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };
  useEffect(() => {
    dispatch(getAllherbs())
  }, [dispatch])
  // console.log("herbs : ", herbs.filter(herb => herb.approved != false))

  const searchFilter = () => {
    let newHerb = herbs.filter(herb => herb.approved != false)
    return search
      ? newHerb.filter((item) =>
        keys.some((key) =>
          typeof item[key] === "string"
            ? item[key].toLowerCase().includes(query.toLowerCase())
            : item["price"] >= Number(query)
        )
      )
      : newHerb;
  };

  const sendImageAi = () => {
    // if (classesName.length == 0) return
    console.log("name : ", classesName[0])
    let name = classesName[0];
    if (name == "Rhinacanthus nasutus-") {
      name = "เสลดพังพอนตัวผู้"
    } else if (name == "Orthosiphon aristatus") {
      name = "ทองพันชั่ง"
    } else if (name == "Female Esldpagpon") {
      name = "หญ้าหนวดแมว"
    } else if (name == "Rang Chuet") {
      name = "อัญชัน"
    }
    else if (name == "Rhinacanthus nasutus" || name == "Female Esldpagpon") {
      name = "เสลดพังพอนตัวเมีย"
    }
    else if (name == "butterfly pea") {
      name = "รางจืด"
    }
    else if (name == "okra" || name == "laurel clock") {
      name = "กระเจี๊ยบแดง"
    }
    console.log({ classesName })
    setClassesName([])
    setQuery(name)
    setSearch(true)
    // console.log({ query })
  }
  const handleQuery = (e) => {

    const query = e.target.value;
    // console.log({ query })
    if (query === "") {
      setSearch(false);
      setQuery("");
    } else {
      setQuery(query);
    }
  };

  // if (imageRef.current != null) {
  //   setClose(true)
  // }
  // console.log("imageRef : ", imageRef.current)

  const handleDropImage = (file) => {
    // Push all the axios request promise into a single array
    // Initial FormData
    setClose(true)
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

  }
  // const shortWord = (word) => {
  //   return word.split(' ').slice(0, 7)
  // }

  return (
    <div className='relative bg-navbarFont  -mb-20 pb-10'>
      <div className="relative">
        <img src={topgraphic} alt="topgraphic" className='w-full h-[200px]' />
        <h1 className='text-3xl mt-10 my-4 text-white font-bold absolute bottom-10 left-60'>ข้อมูลสมุนไพรทั้งหมด</h1>
      </div>
      <Helmet><title>ข้อมูลสมุนไพรทั้งหมด</title></Helmet>
      <div className="lg:max-w-5xl sm:max-w-2xl max-w-sm mx-auto my-4">
        <form className="flex justify-start items-center max-w-[800px] my-4 mt-8 ml-2 mx-auto">
          <div className="relative w-fit">
            <select onChange={(e) => setStatusInput(e.target.value)} className='h-[40px] hover:bg-narbarBg1 text-white pl-3 sm:w-[150px] xs:w-[100px] rounded-tl-lg rounded-bl-lg bg-narbarBg2'>
              <option value="text" selected>ข้อความ</option>
              <option value="file">รูปภาพ</option>
            </select>
          </div>
          <div className="relative w-full">
            <div className={statusInput == "text" ? "" : "hidden"}>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" onChange={handleQuery} id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-br-lg rounded-tr-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="ค้นหาสมุนไพร" required />
              {/* <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
              </button> */}
            </div>
            <div className={statusInput == "text" ? "hidden" : "relative"}>
              <SendImage imageRef={imageRef} />
              <span className="absolute right-2 bottom-2 text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
            </div>
          </div>
          <button type="button" onClick={() => statusInput == "text" ? setSearch(true) : sendImageAi()} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
            <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>ค้นหา
          </button>
        </form>

        <div className={classesName.length > 0 ? "" : "hidden"}>
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-bgShadow bg-blend-darken overflow-auto z-50">
            <div className="absolute transition-transform w-[500px] p-10 rounded-md text-navbarFont1 bg-white" style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
              <span className='absolute top-3 right-5 font-bold cursor-pointer text-lg' title='closes' onClick={() => closeImage()} >x</span>
              <div className="contents">
                <img
                  src="#"
                  ref={imageRef}
                  alt="" class="h-[300px] w-full"
                  onLoad={() => detectImage(imageRef.current, model, classThreshold, canvasRef.current, setClassesName)}
                />
                <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} className=' hidden' />
              </div>
              <div className="flex mt-3">
                <SendImage imageRef={imageRef} />
                <button type="button" onClick={() => sendImageAi()} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                  <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>ค้นหา
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {
            searchFilter().length === 0
              ?
              <h1 className='text-red-400 text-center text-xl'>ไม่พบสมุนไพร</h1>
              :
              searchFilter().map((item, i) => (
                // <div key={i} className="border-double border-4 border-emerald-600 lg:w-[300px] rounded-md m-2 gap-4">
                //   <Link to={`/herb/${item._id}`} ><img src={`${item.image}`} alt="" className='h-[250px] w-full p-2 border rounded-md' /></Link>
                //   <div className="p-2">
                //     <Link to={`/herb/${item._id}`} className=" text-emerald-700"><strong>ชื่อ</strong> : <span className=' text-emerald-400 hover:text-red-400'>{item.name}</span></Link>
                //     <p className='text-sm text-orange-700'><strong>ชื่อวิทยาศาสตร์</strong> : <span className='text-sm text-orange-400'>{item?.nameScience}</span></p>
                //     <p><strong>ราคา</strong> : {item.price} บาท (ขีด)</p>
                //   </div>
                // </div>
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
                        <div className="flex items-center hover:gap-1 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>

                          <span className="card__time hover:text-black">{item.price} บาท</span>
                        </div>
                      </div>
                    </div>

                    <div className="card__img"></div>
                    <Link to={`/herb/${item?._id}`} className="card_link">
                      <div className="card__img--hover" style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
                    </Link>
                    <div className="card__info mt-2 py-2">
                      <span className="card__category"> {item.name} </span>
                      <h3 className="card__title">{item.shortProperties}</h3>
                      <div className="absolute bottom-2 flex items-center w-5/6 justify-between">
                        <span className="card__by">ชื่อ <Link to={`/herb/${item?._id}`} className="card_name" title={item.name}>{item.name}</Link></span>
                        <span className="card__time hover:text-black">ราคา {item.price} บาท</span>
                      </div>
                    </div>
                  </article>
                </section>
              ))
          }
        </div>

      </div>
    </div>
  )
}

export default Herbs