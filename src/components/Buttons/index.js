import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const CreateButton = () => {

    return (
        <>
            <Link to="/createTodo">
                <div className='h-20 w-20 cursor-pointer bg-[#181622] hover:transition duration-200 hover:duration-200 hover:scale-[1.08] border border-white border-opacity-30 rounded-full fixed bottom-8 right-8 flex items-center justify-center text-white'>
                    <FontAwesomeIcon icon={faPen} size="2x" />
                </div>
            </Link>
        </>
    )

}

export default CreateButton