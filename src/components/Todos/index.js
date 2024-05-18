import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CreateButton from "../Buttons";
import Todo from "./todo";
import { useAuth } from "../../context/AuthContext";
import { getName } from "../../util";
import { db } from "../../firebase.config";

const Todos = () => {
    const { currentUser } = useAuth();
    const [data, setData] = useState([]);
    const [original, setOriginal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const fetchData = async () => {
        try {
            if (currentUser) {
                setLoading(true);
                const userTodosRef = collection(db, 'todos', currentUser.uid, 'userTodos');
                const q = query(userTodosRef);
                onSnapshot(q, (querySnapshot) => {
                    const todosData = [];
                    querySnapshot.forEach((doc) => {
                        todosData.push({ ...doc.data(), id: doc.id });
                    });
                    setData(todosData);
                    setOriginal(todosData);
                    setLoading(false);
                });
            }
        } catch (err) {
            console.log("There was an error fetching data");
        }
    };

    const handleFilter = (val) => {
        setStatusFilter(val);
        filterTodos(searchTerm, val);
    };

    const handleSearch = (val) => {
        setSearchTerm(val);
        filterTodos(val, statusFilter);
    };

    const filterTodos = (search, status) => {
        let filtered = original;

        if (status !== "All") {
            filtered = filtered.filter(todo => todo.status === status);
        }

        if (search) {
            filtered = filtered.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
        }

        setData(filtered);
    };

    return (
        <>
            <div className='mt-9 lg:mt-10 mx-4 lg:mx-20 relative'>
                <div className="w-full flex justify-center text-white mb-5 text-lg">
                    <p>Welcome {getName(currentUser?.email) || ""} &#128075;</p>
                </div>
                <div className="w-full flex justify-center">
                    <div className="mb-10 w-full lg:w-3/4 flex items-center gap-4">
                        <div className="lg:mt-0 mt-2 lg:ml-0 lg:flex lg:justify-end text-sm w-full bg-[#13111c] font-bold text-white px-2 py-2 rounded-md border">
                            <input 
                                onChange={(e) => handleSearch(e.target.value)} 
                                className="lg:mt-0 lg:flex lg:justify-end text-sm w-full focus:outline-none bg-[#13111c] font-bold text-white px-2 py-2 rounded-md" 
                                placeholder="Search..." 
                            />
                        </div>
                        <div className="lg:mt-0 mt-2 lg:ml-0 lg:flex lg:justify-end text-sm w-1/2 lg:w-1/4 bg-[#13111c] font-bold text-white px-2 py-2 rounded-md border">
                            <select 
                                onChange={(e) => handleFilter(e.target.value)} 
                                className="lg:mt-0 lg:flex lg:justify-end text-sm w-full focus:outline-none bg-[#13111c] font-bold text-white px-2 py-2 rounded-md">
                                <option value="All">All</option>
                                <option value="To-do">Todo</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full flex justify-center text-2xl">
                        <p className="text-white">Loading...</p>
                    </div>
                ) : (
                    <>
                        {data.length > 0 ? (
                            data.map((todo) => (
                                <Todo key={todo.id} todo={todo} fetchData={fetchData} />
                            ))
                        ) : (
                            <div className="w-full flex justify-center text-2xl">
                                <p className="text-white">Make a new todo to get started!</p>
                            </div>
                        )}
                    </>
                )}
                <CreateButton />
            </div>
        </>
    );
}

export default Todos;
