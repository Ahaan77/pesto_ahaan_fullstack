// src/components/Login.js
import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    return (
        <div className="flex justify-center items-center h-full relative mt-9 lg:mt-20 mx-5 lg:mx-0">
            <div className="lg:w-1/2 w-full bg-[#181622] border border-white border-opacity-30 rounded-xl ">
                <p className='text-3xl text-white mt-5 ml-5'>Login</p>
                <div className="mx-5 mt-5">
                    <input className="w-full bg-gray-800 p-2 rounded-md text-white" type="email" placeholder="Email" ref={emailRef} />
                </div>
                <div className="mx-5 mt-5">
                    <input className="w-full bg-gray-800 p-2 rounded-md text-white" type="password" placeholder="Create Password" ref={passwordRef} />
                </div>
                <div className="mt-5 mb-7 w-full flex justify-center">
                    <div onClick={(e) => handleSubmit(e)} className="px-4 py-2 bg-green-500 hover:bg-green-700 hover:transition duration-200 font-bold text-white rounded-md cursor-pointer">Login</div>
                </div>
                <div className="mt-5 mb-7 w-full flex justify-center">
                    <p className='text-white'>New user? <Link to="/signup"><span>Sign Up</span></Link></p>
                </div>

            </div>
        </div>
    );
}
