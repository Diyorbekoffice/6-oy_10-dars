import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validate = () => {
        if (usernameRef.current.value.length < 3) {
            alert("User is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = "red";
            return false;
        }
        if (surnameRef.current.value.length < 3) {
            alert("Surname is not valid");
            surnameRef.current.focus();
            surnameRef.current.style.outlineColor = "red";
            return false;
        }
        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    };

    const handRegister = (event) => {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return;
        }

        const registerUser = {
            email: emailRef.current.value,
            firstName: usernameRef.current.value,
            lastName: surnameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: rePasswordRef.current.value
        };
        axios.post(`https://trello.vimlc.uz/api/auth/register`, registerUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if (data.data.message === "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi.") {
                    navigate("/login");
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => { 
                if (err.response) {
                    console.error('Server javobi:', err.response.data);  
                    alert(`Error: ${err.response.data.message}`);
                } else if (err.request) {
                    console.error('So\'rov yuborildi, ammo javob kelmadi', err.request); 
                    alert("No response from server. Please try again later.");
                } else {
                    console.error('Xato ro\'y berdi:', err.message);  
                    alert(`Error: ${err.message}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-300 rounded-xl mx-auto shadow-lg w-full md:w-1/3 mt-16 p-8'>
            <h2 className='text-center text-blue-700 text-4xl mb-6 tracking-tight'>Create Account</h2>
            <form className='flex flex-col'>
                <input ref={usernameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm' type="text" placeholder='First Name' />
                <input ref={surnameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm' type="text" placeholder='Last Name' />
                <input ref={emailRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm' type="email" placeholder='Email Address' />
                <input ref={passwordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm' type="password" placeholder='Password' />
                <input ref={rePasswordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm' type="password" placeholder='Confirm Password' />
                <button disabled={loading} onClick={handRegister} className='bg-blue-500 text-white w-full p-3 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-400'>{loading ? "Registering..." : "Sign Up"}</button>
                <Link className='text-center mt-4 text-blue-500 hover:text-blue-600 transition-all duration-200' to="/login">Already have an account? Log in</Link>
            </form>
        </div>
    );
}

export default Register;
