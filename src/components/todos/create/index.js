import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import Loader from "../../Loader";
import { db } from "../../../firebase.config";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const addTodo = async () => {
        if (!title || !content || !dateTime) {
            setError("Title, content, and dateTime are required");
            return;
        }

        try {
            setError('');
            setLoading(true);
            const userTodosRef = collection(db, 'todos', currentUser.uid, 'userTodos');
            await addDoc(userTodosRef, {
                description: content,
                status: 'To-do',
                time: new Date().getTime(),
                title: title,
                dateTime: dateTime
            });
            setSuccess(true);
        } catch (err) {
            setError("Error making a todo");
            console.error("Error making a todo", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full relative mt-9 lg:mt-20 mx-5 lg:mx-0">
            <div className="lg:w-1/2 w-full bg-[#181622] border border-white border-opacity-30 rounded-xl">
                <p className='text-3xl text-white mt-5 ml-5'>Create New Todo</p>
                <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                    <div className="mx-5 mt-5">
                        <input
                            className="w-full bg-gray-800 p-2 rounded-md text-white"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div className="mx-5 mt-5">
                        <textarea
                            className="w-full h-[20vh] bg-gray-800 p-2 rounded-md text-white"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Add Description..."
                        />
                    </div>
                    <div className="mx-5 mt-5">
                        <input
                            type="datetime-local"
                            className="w-full bg-gray-800 p-2 rounded-md text-white"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 mb-7 w-full flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-200 font-bold text-white rounded-md"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : (success ? 'Todo Created Successfully' : 'Create')}
                        </button>
                    </div>
                </form>
                {error && (
                    <div className="mt-5 mb-7 w-full flex justify-center">
                        <div className="px-4 py-2 bg-red-500 font-bold text-white rounded-md">
                            {error}
                        </div>
                    </div>
                )}
                {success && (
                    <a href="/">
                        <div className="mt-5 mb-7 w-full flex justify-center text-white underline cursor-pointer">
                            Go back
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Create;
