import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
// import {AiOutlineEye,AiOutlineInvisible} from "react-icons/ai";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({setIsLoggedIn}) => {
  const navigate=useNavigate();
  const[formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

const[showPassword,setShowPassword]=useState(false)
const [confirmShowPassword,setConfirmShowPassword]=useState(false)
const[accountType,setAccountType]=useState("student");

  function changeHandler(event){
    setFormData((prev)=>{
      return {...prev,[event.target.name]:event.target.value}
    })
  }
  function submitHandler(event) {
    event.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    const username = formData.email; // Using formData.email directly
  
    if (localStorage.getItem(username)) {
      alert('Username already exists');
    } 
    else {
      // Save hashed password in local storage (for demonstration purposes)
      const hashedPassword = btoa(formData.password); // Base64 encoding for simplicity
      const user = { username, password: hashedPassword };
      localStorage.setItem(username, JSON.stringify(user));
  
      toast.success("Account created successfully");
  
      const accountData = {
        ...formData
      };

      const finalData={
        ...accountData,accountType
      }
  
      
      console.log(finalData);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }
  
  

  return (
    <div>
      <div  className='flex bg-richblack-800 p-1 gay-x-1 my-6 rounded-full max-w-max'>
      <button onClick={()=>setAccountType("student")}
      className={`${
            accountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200 "
          } py-2 px-5 rounded-full transition-all`}
       >
        Student
      </button>

      <button onClick={()=>setAccountType("instructor")}
      className={`${
            accountType === "instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200 "
          } py-2 px-5 rounded-full transition-all`}>
        Instructor
      </button>
      </div>
     
      <form onSubmit={submitHandler}>
      <div className='flex gap-x-10 '>
      <label className='w-full'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup  className='text-pink-200'>*</sup></p>

          <input 
            required
            type="text"
            name="firstName"
            onChange={changeHandler}
            placeholder='Enter First Name'
            value={formData.firstName}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <label className='w-full'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>

          <input 
            required
            type="text"
            name="lastName"
            onChange={changeHandler}
            placeholder='Enter Last Name'
            value={formData.lastName}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

</div>
<div >
<label className='w-full mt-4'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email<sup className='text-pink-200'>*</sup></p>

          <input 
            required
            type="text"
            name="email"
            onChange={changeHandler}
            placeholder='Enter Email Address'
            value={formData.email}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>
</div>
        

    <div className='flex gap-x-4 mx-0 '>
    <label className='w-full relative'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>

          <input 
            required
            type={showPassword?("text"):("password")}
            name="password"
            onChange={changeHandler}
            placeholder='Enter Password'
            value={formData.password}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
          <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                    {showPassword ? (<FaEye fontSize={24}  fill='#AFB2BF'/>):(<FaEyeSlash fontSize={24}  fill='#AFB2BF'/>)}
               </span>
      </label>


        <label className='w-full relative'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup  className='text-pink-200'>*</sup></p>

          <input 
            required
            type={showPassword?("text"):("password")}
            name="confirmPassword"
            onChange={changeHandler}
            placeholder='Enter Password'
            value={formData.confirmPassword}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
            <span onClick={()=>setConfirmShowPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                    {confirmShowPassword ? (<FaEye fontSize={24}  fill='#AFB2BF'/>):(<FaEyeSlash fontSize={24}  fill='#AFB2BF'/>)}
            </span>

            
        </label>

    </div>
        
      
       <button className='bg-yellow-50 rounded-[8px] w-full font-medium text-richblack-900
        px-[12px] py-[8px] mt-6'>Create Account</button>
      </form>
    </div>
  )
}

export default SignupForm;
