import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const checkEmailValidity = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validateInputs() {
        if (!checkEmailValidity(emailInputRef.current.value)) {
            alert("Email is not valid");
            emailInputRef.current.focus();
            emailInputRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }

    function handleLogin(event) {
        event.preventDefault();

        const isValid = validateInputs();
        if (!isValid) {
            return;
        }

        const userCredentials = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        setIsLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userCredentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.message === "success") {
                    console.log(response.data.massage);
                    
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    navigate("/");
                    emailInputRef.current.value = '';
                    passwordInputRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function register(event) {
        navigate('/register')
    }

    return (
        <div className='bg-gradient-to-b from-green-50 to-green-100 border border-green-400 rounded-lg mx-auto shadow-xl w-full md:w-1/2 mt-24 p-8'>
            <h2 className='text-center text-green-700 text-5xl mb-6 tracking-tight'>Login</h2>
            <form className='flex flex-col items-center'>
                <input
                    ref={emailInputRef}
                    className='p-3 mb-4 border rounded-lg w-1/3 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm'
                    type="email"
                    placeholder='Enter your email...'
                />
                <input
                    ref={passwordInputRef}
                    className='p-3 mb-4 border rounded-lg w-1/3 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm'
                    type="password"
                    placeholder='Enter your password...'
                />
                <button
                    disabled={isLoading}
                    onClick={handleLogin}
                    className='bg-green-500 text-white w-1/3 p-2 rounded-lg hover:bg-green-600 transition-all duration-200 ease-in-out focus:ring-4 focus:ring-green-400'
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <button onClick={register} className='mt-4 text-green-600 hover:text-green-700 transition-all duration-200'>Akkaunt yo'qmi? Ro'yxatdan o'ting</button>
            </form>
        </div>
    );
}

export default UserLogin;
