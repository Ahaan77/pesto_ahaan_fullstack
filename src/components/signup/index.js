// src/components/Signup.js
import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (confirmPasswordRef.current.value === passwordRef.current.value) {
                setError('');
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value);
                navigate('/');
            } else {
                window.alert("Please ensure password and confirm password are same.")
                confirmPasswordRef.current.value = "";
                passwordRef.current.value = "";
            }

        } catch {
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <>
            <div className="flex justify-center items-center h-full relative mt-9 lg:mt-20 mx-5 lg:mx-0">
                <div className="lg:w-1/2 w-full bg-[#181622] border border-white border-opacity-30 rounded-xl ">
                    <p className='text-3xl text-white mt-5 ml-5'>Signup</p>
                    <div className="mx-5 mt-5">
                        <input className="w-full bg-gray-800 p-2 rounded-md text-white" type="email" placeholder="Email" ref={emailRef} />
                    </div>
                    <div className="mx-5 mt-5">
                        <input className="w-full bg-gray-800 p-2 rounded-md text-white" type="password" placeholder="Create Password" ref={passwordRef} />
                    </div>
                    <div className="mx-5 mt-5">
                        <input className="w-full bg-gray-800 p-2 rounded-md text-white" type="password" placeholder="Confirm Password" ref={confirmPasswordRef} />
                    </div>
                    <div className="mt-5 mb-7 w-full flex justify-center">
                        <div onClick={(e) => handleSubmit(e)} className="px-4 py-2 bg-green-500 hover:bg-green-700 hover:transition duration-200 font-bold text-white rounded-md cursor-pointer">
                            {loading ? <Loader /> : <span>Sign Up</span>}</div>
                    </div>

                </div>
            </div>
        </>
    );
}
