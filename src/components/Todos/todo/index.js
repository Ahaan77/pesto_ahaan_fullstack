import { getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react";
import { assignTodoColor, reverseTimer } from "../../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

const Todo = ({ todo, fetchData }) => {

    const db = getFirestore();
    const { currentUser } = useAuth();
    const [status, setStatus] = useState(todo?.status)
    const [statusColor, setStatusColor] = useState(assignTodoColor(todo?.status))


    const deleteTodo = async (id) => {
        try {
            const todoRef = doc(db, "todos", currentUser.uid, "userTodos", id);
            await deleteDoc(todoRef);
            fetchData();  
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const updateTodo = async (id, newStatus) => {
        try {
            const todoRef = doc(db, "todos", currentUser.uid, "userTodos", id);
            await updateDoc(todoRef, { status: newStatus });
            fetchData();  
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatusColor(assignTodoColor(newStatus))
        setStatus(newStatus);
        await updateTodo(todo?.id, newStatus);
    };

    return (
        <div id={todo?.id} className='flex justify-center'>
            <div style={{ zIndex: 9990, border: `0.4px solid ${statusColor}` }} className={`w-full lg:w-3/4 mb-10 bg-[#071a2b] rounded-xl`}>
                <div className="flex flex-col lg:flex-row  w-full">
                    <div className='mt-5 ml-5 w-full'>
                        <p className='text-xl lg:text-3xl text-white'>{todo?.title}</p>
                        <p className='text-xs lg:text-base text-gray-400 mt-2 flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faClock} />
                            {reverseTimer(todo?.dateTime)}</p>
                    </div>

                    {/* <p className="text-white mt-5 flex justify-end text-sm w-full mr-5">{assignTodoColor(todo?.status)}</p> */}
                    <select style={{ width: "200px" }} onChange={handleStatusChange} className="lg:mt-0 mt-2 ml-2 lg:ml-0 lg:flex focus:outline-none lg:justify-end text-sm w-full lg:mr-5 bg-transparent font-bold text-white px-2 py-2 rounded-xl" value={status}>
                        <option value="To-do">To-do</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p className='text-sm lg:text-base mt-3 ml-5 text-white text-opacity-50 mb-6 mr-5'> {todo?.description}</p>
                    <button onClick={() => deleteTodo(todo?.id)} className="mt-3 mr-5 mb-4">
                        <img className="w-6 h-6 hover:scale-[1.3] hover:transition duration-200 hover:duration-200" src="/trash.svg" alt="trash-can" />
                    </button>
                </div>

            </div>
            
        </div>
    )


}

export default Todo