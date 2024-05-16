import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useEffect, useState } from 'react';
import CreateButton from "../buttons";
import Loader from "../loader";
import Todo from "./todo";

const Todos = () => {

    const db = getFirestore();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const todoRef = collection(db, 'todos');
            let allTodos = await getDocs(todoRef);

            let res = [];

            allTodos.forEach((doc) => {
                res.push({ id: doc.id, ...doc.data() });
            })

            setData(res)

            setLoading(false)
        } catch (err) {
            console.log("There was an error fetching data")
        }

    }

    return (
        <>
            <div className='mt-9 lg:mt-20 mx-4 lg:mx-20 relative '>

                {data?.map((todo) => {
                    return (
                        <Todo key={todo?.id} todo={todo} fetchData={fetchData} />
                    )
                })
                }
                <CreateButton />

            </div>
        </>

    )
}

export default Todos