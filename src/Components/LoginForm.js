import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
// import {AiOutlineEye,AiOutlineInvisible } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';




const LoginForm = ({setIsLoggedIn}) => {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:"",password:""
    })
    const [showPassword,setShowPassword]=useState(false)

    function changeHandler(event){
        setFormData((prevData)=>{
            return{...prevData,[event.target.name]:event.target.value}
        })
    }

    function submitHandler(event) {
        event.preventDefault();
      
        const userString = localStorage.getItem(formData.email);
      
        if (userString) {
          const storedUser = JSON.parse(userString);
      
          // Compare hashed passwords (for demonstration purposes)
          if (btoa(formData.password) === storedUser.password) {
            // Authentication successful
            setIsLoggedIn(true);
            toast.success("Logged In");
            navigate("/dashboard");
          } else {
            // Incorrect password
            alert('Invalid username or password');
          }
        } else {
          // User not found
          alert('Invalid username or password');
        }
      }
      

  return (
    
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input required
                    type="text"
                    value={formData.email}
                    placeholder='Enter your email'
                    name="email"
                    onChange={changeHandler}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
               
            </label>
            
            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password<sup  className='text-pink-200'>*</sup>
                </p>
                <input required
                    type={showPassword? ("text"):("password")}
                    value={formData.password}
                    placeholder='Enter your password'
                    name="password"
                    onChange={changeHandler}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
               <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                    {showPassword ? (<FaEye fontSize={24} fill='#AFB2BF'/>):(<FaEyeSlash fontSize={24}  fill='#AFB2BF'/>)}
               </span>

               <Link to="#">
               <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
               Forgot Password
               </p>
               
               </Link>
            </label>
            

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900
        px-[12px] py-[8px] mt-6'>
            Sign in
        </button>

        </form> 
   
  )
}

export default LoginForm
