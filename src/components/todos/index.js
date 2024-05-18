import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from 'react';
import CreateButton from "../buttons";
import Todo from "./todo";
import { useAuth } from "../../context/AuthContext";
import { getName } from "../../util";

const Todos = () => {

    const db = getFirestore();
    const { currentUser } = useAuth();
    const [data, setData] = useState([])
    const [original, setOriginal] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {

            if (currentUser) {
                setLoading(true)
                const userTodosRef = collection(db, 'todos', currentUser.uid, 'userTodos');
                const q = query(userTodosRef);
                onSnapshot(q, (querySnapshot) => {
                    const todosData = [];
                    querySnapshot.forEach((doc) => {
                        todosData.push({ ...doc.data(), id: doc.id });
                    });
                    // setTodos(todosData);
                    console.log(todosData)
                    setData(todosData)
                    setOriginal(todosData)
                    setLoading(false)
                });
            }
        } catch (err) {
            console.log("There was an error fetching data")
        }

    }

    const handleFilter = (val) => {
        if (val !== "All") {
            console.log(val)
            let filter = original?.filter((item) => {
                return item.status === val
            })
            console.log("filter", filter)

            setData(filter)
        } else {
            setData(original)
        }
    }

    return (
        <>
            <div className='mt-9 lg:mt-10 mx-4 lg:mx-20 relative '>
                <div className="w-full flex justify-center text-white mb-5 text-lg">
                    <p>Welcome {getName(currentUser?.email) || ""} &#128075;</p>
                </div>
                <div className="w-full flex justify-center">
                    <div className="mb-10 w-full lg:w-3/4">
                        <div className="lg:mt-0 mt-2  lg:ml-0 lg:flex lg:justify-end text-sm w-full lg:mr-5 bg-transparent font-bold text-white px-2 py-2 rounded-md border">
                            <select onChange={(e) => handleFilter(e.target.value)} className="lg:mt-0 lg:flex lg:justify-end text-sm w-full focus:outline-none bg-transparent font-bold text-white px-2 py-2 rounded-md ">
                                <option value="All">All</option>
                                <option value="To-do">Todo</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {data.length > 0 &&
                    <>
                        {data?.map((todo) => {
                            return (
                                <Todo key={todo?.id} todo={todo} fetchData={fetchData} />
                            )
                        })
                        }
                    </>}
                {
                    data.length === 0 && <div className="w-full flex justify-center text-2xl"><p className="text-white">Make a new todo to get started!</p></div>
                }    
                <CreateButton />

            </div>
        </>

    )
}

export default Todos