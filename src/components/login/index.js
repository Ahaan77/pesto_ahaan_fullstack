import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
            setError('Email and password are required');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError('Failed to log in, try again');
        }

        setLoading(false);
    }

    useEffect(() => {
        if (error) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            const timer = setTimeout(() => {
                setError("");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="flex justify-center items-center h-full relative mt-9 lg:mt-20 mx-5 lg:mx-0">
            <div className="lg:w-1/2 w-full bg-[#071a2b] border border-white border-opacity-30 rounded-xl">
                <p className='text-3xl text-white mt-5 ml-5'>Login</p>
                <form onSubmit={handleSubmit}>
                    <div className="mx-5 mt-5">
                        <input
                            className="w-full bg-gray-800 p-2 rounded-md text-white"
                            type="email"
                            placeholder="Email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="mx-5 mt-5">
                        <input
                            className="w-full bg-gray-800 p-2 rounded-md text-white"
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </div>
                    <div className="mt-5 mb-7 w-full flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 hover:bg-green-700 transition duration-200 font-bold text-white rounded-md"
                            disabled={loading}
                        >
                            {loading ? <Loader /> : 'Login'}
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
                <div className="mt-5 mb-7 w-full flex justify-center">
                    <p className='text-white'>
                        New user? <Link to="/signup" className="text-green-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
