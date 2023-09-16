import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUSer } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const user=useSelector((store)=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
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
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img  className="w-44 mx-auto md:mx-0" 
        src={LOGO}
        alt="logo"/>
        {user!==null && <div className='flex p-2'>
          {/* <img alt="usericon"
          className='w-12 h-12'
          /> */}
          {showGptSearch &&<select className="p-2 m-2 bg-gray-900 text-white"
          onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang)=>(
              <option key={lang.identifier}
              value={lang.identifier}>{lang.name}
              </option>
            ))}
          </select>}
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}>{showGptSearch?"HomePage":"GPT Search"}</button>
          <button 
          onClick={handleSignOut}
          className='font-bold text-white' >Sign Out</button>
        </div>}
    </div>
  )
}

export default Header