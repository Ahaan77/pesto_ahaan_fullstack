import { getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react";
import { assignTodoColor } from "../../../util";

const Todo = ({ todo, fetchData }) => {

    const db = getFirestore();
    const [status, setStatus] = useState(todo?.status)
    const [statusColor, setStatusColor] = useState(assignTodoColor(todo?.status))

    
    const deleteTodo = async (id) => {
        try {
            const todoRef = doc(db, "todos", id);
            await deleteDoc(todoRef);
            fetchData()
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const updateTodo = async (id, newStatus) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, { status: newStatus });
            setStatusColor(assignTodoColor(newStatus))
            fetchData();
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        await updateTodo(todo?.id, newStatus);
    };



    return (
        <div id={todo?.id} className='flex justify-center'>
            <div style={{ zIndex: 9990 }} className={`w-full lg:w-3/4 mb-10 bg-[#181622] border-2 border-${statusColor} border-opacity-30 rounded-xl`}>
                <div className="flex items-center w-full">
                    <p className='text-xl lg:text-3xl text-white mt-5 ml-5 w-full'>{todo?.title}</p>
                    {/* <p className="text-white mt-5 flex justify-end text-sm w-full mr-5">{assignTodoColor(todo?.status)}</p> */}
                    <select style={{ width: "200px" }} onChange={handleStatusChange} className="mt-5 flex justify-end text-sm w-full mr-5 bg-transparent font-bold text-white px-2 py-2 rounded-xl" value={status}>
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