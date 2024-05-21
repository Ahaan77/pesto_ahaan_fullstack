import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
const Topbar = () => {

    const { logout, currentUser } = useAuth()
    return (
        <div style={{ zIndex: 9999 }} className='h-20 border-b border-white bg-[#031525] border-opacity-20 sticky top-0 flex items-center justify-between'>
            <div className='text-white text-xl lg:text-2xl lg:mx-10 mx-5 font-bold'>
                📋 Taskify
            </div>
            {currentUser && <div className='sm:flex text-white text-xs lg:text-sm mx-5 lg:mx-10 font-light items-center'>
                <span onClick={() => logout()} className="hover:scale-[1.2] cursor-pointer transition duration-200 hover:transition-duration-200"><FontAwesomeIcon icon={faSignOut} size={"2x"} color="Tomato" /></span>
            </div>}
        </div>
    )
}

export default Topbar