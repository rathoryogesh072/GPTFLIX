import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_URL } from '../utils/constants';
const Login = () => {
  const [isSignInForm,seIsSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const dispatch=useDispatch();
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const toggleSignInForm=()=>{
    seIsSignInForm(!isSignInForm);
  }

  const handleButtonClick=()=>{
    //validation
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message!==null){
      return;
    }
    //Sign in Sign up logic
    if(isSignInForm===false){
      createUserWithEmailAndPassword(
        auth, 
        email.current.value,
        password.current.value
        )
         .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const{uid,email,displayName}=auth.currentUser;
            dispatch(
              addUser({
                uid:uid,
                email:email,
                displayName:displayName,
              })
            )
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });  
        })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           setErrorMessage(errorCode+"-"+errorMessage)
      });
    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
      //  console.log(user);
       // ...
      })
      .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrorMessage(errorCode+" "+errorMessage);
      });
    }
  }
  return (
    <div>
        <Header/>
        <div>
         <img className='absolute' src={BG_URL}
         alt='bg'/>
        </div>
        <form className='bg-black absolute w-3/12 bg-opacity-80 my-36 mx-auto right-0 left-0 text-white p-12' onSubmit={(e)=>(e.preventDefault())}>
          <h1 className='font-bold text-3xl py-4 '>{isSignInForm===true?"Sign In":"Sign Up"}</h1>
          {isSignInForm===false && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
          <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
          <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
          <button className='p-4 my-6 w-full bg-red-600' onClick={handleButtonClick}>{isSignInForm===true?"Sign In":"Sign Up"}</button>
          <p onClick={toggleSignInForm} className='py-4 cursor-pointer'> {isSignInForm===true?"New to Netflix?Sign Up Now":"Already Registered?Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login