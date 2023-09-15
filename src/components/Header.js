import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUSer } from '../utils/userSlice'
import { LOGO } from '../utils/constants';
const Header = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
    
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const {uid,email,displayName}=user;
          dispatch(
            addUser({
                uid:uid,
                email:email,
                displayName:displayName}));
                navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUSer());
          navigate("/")
        
        }
      });
      return()=>unsubscribe();
},[])
  return (
    <div className=' flex w-full absolute px-8 py-2 bg-gradient-to-b from-black justify-between z-10'>
        <img  className="w-44" 
        src={LOGO}
        alt="logo"/>
        {user!==null && <div className='flex p-2'>
          {/* <img alt="usericon"
          className='w-12 h-12'
          /> */}
          <button 
          onClick={handleSignOut}
          className='font-bold text-white' >Sign Out</button>
        </div>}
    </div>
  )
}

export default Header