import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm,seIsSignInForm]=useState(true);

  const toggleSignInForm=()=>{
    seIsSignInForm(!isSignInForm);
  }
  return (
    <div>
        <Header/>
        <div>
         <img className='absolute' src='https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg'
         alt='bg'/>
        </div>
        <form className='bg-black absolute w-3/12 bg-opacity-80 my-36 mx-auto right-0 left-0 text-white p-12'>
          <h1 className='font-bold text-3xl py-4 '>{isSignInForm===true?"Sign In":"Sign Up"}</h1>
          {isSignInForm===false && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
          <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
          <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
          <button className='p-4 my-6 w-full bg-red-600'>{isSignInForm===true?"Sign In":"Sign Up"}</button>
          <p onClick={toggleSignInForm} className='py-4 cursor-pointer'> {isSignInForm===true?"New to Netflix?Sign Up Now":"Already Registered?Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login