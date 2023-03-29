import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from '../../redux/actions/userAction'
import logo from '../../assets/images/logo.png'
import Login from "../../pages/Login/Login";
function Navbar({ user, logoutUser }) {
    const [navbar, setNavbar] = useState(false);
    const [loginActive, setLoginActive] = useState(false);
    console.log({ user })
    const location = useLocation();
    useEffect(() => {
        if (loginActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'scroll'
        }
    })
    // console.log({ user })
    let active = 'text-white text-lg font-semibold hover:text-red-600 hover:underline text-amber-600';
    let notActive = "text-navbarFont text-lg font-semibold hover:text-red-600 hover:underline";
    return (
        <nav className="w-full bg-gradient-to-r from-narbarBg to-narbarBg3  shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className="flex items-center -my-5">
                            <img src={logo} alt="" className="w-[100px]" />
                            <Link to="/">
                                <h2 className="text-2xl text-navbarFont font-bold">
                                    สมุนไพรไทย
                                </h2>
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 relative justify-self-center pb-3 mt-8 flex-col md:block md:pb-0 md:mt-0 ${navbar ? "flex" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className={location.pathname === "/" ? active : notActive}>
                                <Link to="/" >หน้าแรก</Link>
                            </li>
                            <li className={location.pathname === "/map" ? active : notActive}>
                                <Link to="/map" >แผนที่</Link>
                            </li>
                            <li className={location.pathname === "/herbs" ? active : notActive}>
                                <Link to="/herbs">สมุนไพรทั้งหมด</Link>
                            </li>
                            {/* <li className="text-white text-lg font-semibold hover:text-blue-600 hover:underline">
                                <Link to="/chatbot">แชทบอท</Link>
                            </li> */}
                            {
                                user?.isAdmin
                                    ?
                                    <div className="relative group">
                                        <Link to="/admin" className={location.pathname === "/admin" ? active : notActive}>
                                            แอดมิน
                                        </Link>
                                        <div className="absolute z-10 hidden group-hover:flex">

                                            <div className="bg-white shadow-lg w-[120px]">
                                                <div className="grid grid-cols-1 gap-4 ">
                                                    <p className="px-5 py-3 hover:bg-gray-200 hover:text-amber-700 hover:underline cursor-pointer" onClick={() => logoutUser()}>
                                                        ลงชื่อออก
                                                    </p>
                                                </div>
                                                {/* <div className="grid grid-cols-1 gap-4 ">
                                                    <p className="px-5 py-3 hover:bg-gray-200 hover:text-amber-700 hover:underline cursor-pointer">
                                                        โปรไฟล์
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    user?.username
                                        ?
                                        <div className="relative group">
                                            {
                                                user.role == "herbalist" ?
                                                    <Link to="/admin" className={location.pathname === "/admin" ? active : notActive}>
                                                        <div className="flex flex-col">
                                                            <span> {user.username}</span>
                                                            <span> {user.role == "herbalist" ? "นักสมุนไพร" : ""}</span>
                                                        </div>
                                                    </Link>
                                                    : <span className="text-2xl text-navbarFont font-bold"> {user.username}</span>
                                            }
                                            <div className="absolute z-10 hidden group-hover:flex">

                                                <div className="bg-white shadow-lg w-[120px]">
                                                    <div className="grid grid-cols-1 gap-4 ">
                                                        <p className="px-5 py-3 hover:bg-gray-200 hover:text-amber-700 hover:underline cursor-pointer" onClick={() => logoutUser()}>
                                                            ลงชื่อออก
                                                        </p>
                                                    </div>
                                                    {/* <div className="grid grid-cols-1 gap-4 ">
                                                    <p className="px-5 py-3 hover:bg-gray-200 hover:text-amber-700 hover:underline cursor-pointer">
                                                        โปรไฟล์
                                                    </p>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <li className="text-white text-lg font-semibold hover:text-blue-600 hover:underline relative">
                                            <button type="button" onClick={() => setLoginActive(!loginActive)} className={notActive}>ลงชื่อเข้าใช้</button>
                                        </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Login loginActive={loginActive} setLoginActive={setLoginActive} user={user?.username ?? ""} />
        </nav>
    );
}

const mapStateProps = ({ session }) => ({
    user: session.user,
})
export default connect(mapStateProps, { logoutUser })(Navbar)