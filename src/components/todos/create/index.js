import { useState } from "react"
import { addDoc, collection, getFirestore } from "firebase/firestore"


const Create = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [dateTime, setDateTime] = useState()
    const [success, setSuccess] = useState(false)
    const db = getFirestore();

    const addTodo = async () => {
        try {
            if (title.length !== 0 && content.length !== 0 && dateTime) { // Check if dateTime is not empty
                const todoRef = await addDoc(collection(db, "todos"), {
                    description: content,
                    status: 'To-do',
                    time: new Date().getTime(),
                    title: title,
                    dateTime: dateTime // Include dateTime in the todo document
                });
                setSuccess(true);
            } else {
                console.log("Title, content, and dateTime are required");
            }
        } catch (err) {
            console.error("Error making a todo", err);
        }
    };


    return (
        <div className="flex justify-center items-center h-full relative mt-9 lg:mt-20 mx-5 lg:mx-0">
            <div className="lg:w-1/2 w-full bg-[#181622] border border-white border-opacity-30 rounded-xl ">
                <p className='text-3xl text-white mt-5 ml-5'>Create New Todo</p>
                <div className="mx-5 mt-5">
                    <input className="w-full bg-gray-800 p-2 rounded-md text-white" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="mx-5 mt-5">
                    <textarea className="w-full h-[20vh] bg-gray-800 p-2 rounded-md text-white" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add Description..." />
                </div>
                <div className="mx-5 mt-5">
                    <input
                        type="datetime-local"
                        className="w-full bg-gray-800 p-2 rounded-md text-white"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)} // Update dateTime state
                    />
                </div>
                <div className="mt-5 mb-7 w-full flex justify-center">
                    <div onClick={() => addTodo()} className="px-4 py-2 bg-green-500 hover:bg-green-700 hover:transition duration-200 font-bold text-white rounded-md cursor-pointer">{success === false ? <span>Create</span> : <span>Todo Created Successfully</span>}</div>
                </div>
                {success &&
                    <a href="/">
                        <div className="mt-5 mb-7 w-full flex justify-center text-white underline cursor-pointer">
                            Go back
                        </div>
                    </a>
                }
            </div>
        </div>
    )

}

export default Create