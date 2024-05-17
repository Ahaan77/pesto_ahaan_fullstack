
const Topbar = () => {

    return (
        <div style={{ zIndex: 9999 }} className='h-20 border-b border-white bg-[#181622] border-opacity-20 sticky top-0 flex items-center justify-between'>
            <div className='text-white text-base lg:text-2xl mx-10 font-bold'>
                📋 Pesto Todo
            </div>
            <div className='hidden sm:flex text-white text-xs lg:text-sm mx-10 font-light items-center'>
                Powered by Ahaan <span className="text-xl ml-1">&#9749;</span>
            </div>
        </div>
    )
}

export default Topbar