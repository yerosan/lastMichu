import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useStateContext } from '../context/ContextProvider'
import { loginUser } from '../features/userCreation/loginSlice'
import images from "./coopbuilding.jpg"
import axios from "axios"
import config from '../config/config'
import Alert from "@mui/material/Alert"

const LogIn = () => {
  const {login, setLogin}=useStateContext()
  const {userRoles, setUserRoles}=useStateContext()
  const userIn=useSelector(state=>state.logins)
  const [userinput,setUserinput]=useState({userName:"",password:""})
  const [styel, setStyel]=useState(["box","borderline"])
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const Navigating=()=>{
    navigate('/michu/dashboard')
  }

  useEffect(()=>{
    if(userIn.loading){
      setStyel(["boxs","borderLine"])
    }
    if(!userIn.loading){
      setTimeout(()=>{
        setStyel(["box","borderline"])
      },0)
    }
    if(userIn.data){
      // navigate("/dashboard")
      setLogin(false)
      navigate('michu/dashboard')
    }
  
},[userIn])

  const getInUser=async(data)=>{
      dispatch(loginUser({loading:true, error:"", data:null}))
    try{
         const loginusers=await axios.post(`${config.apiUrl}/user/login`, data)
         if(loginusers.data.message=="succed"){
          let userName=loginusers.data.data.userName
          const roles= await axios.get(`${config.apiUrl}/role/perUser/${userName}`)
           if(roles.data.message="succeed"){
                setUserRoles(roles.data.data)
            }
            else{
              console.log("fail to generateRole ,,,,,,,,,,", userRoles)
            }
            dispatch(loginUser({loading:false, error:"", data:loginusers.data.data}))
         }else{
          dispatch(loginUser({loading:false, error:loginusers.data.message, data:null}))
         }
    }catch(error){
        dispatch(loginUser({loading:false, error:"Somethin went wrong", data:null}))
        console.log("The error",error)
    }

  }


  const handleChange=(e)=>{
    const {name, value}=e.target
    setUserinput({...userinput, [name]:value})
  }
  const passwordHandler=()=>{
    const {login, setLogin}=useStateContext()
    setLogin(false)
  }
  const handleStyle=(event)=>{
    event.preventDefault();
    setStyel(["boxs","borderLine"])
    getInUser(userinput)
  }
  return (
    <div className='abolute flex justify-center items-center'>
    <div className={styel[0]}>
    <span className={styel[1]}></span>
    <form onSubmit={handleStyle}>
      <h2>Sign in</h2>
      <div className="inputBox">
        <input type="text" required="required" name='userName' value={userinput.userName} onChange={handleChange}></input>
        <span>Username</span>
        <i></i>
      </div>
      <div className="inputBox">
        <input type='password' name='password' value={userinput.password} onChange={handleChange} required="required"></input>
        <span>Password</span>
        <i></i>
      </div>
      {userIn.error !== '' && <Alert sx={{mt: 2, mb: 1}} severity="error">{userIn.error}</Alert>}
      <div className="links">
        <input type="submit" value="Login"/> 
      </div>
     
    </form>

  </div>
  </div>
  )
}

export default LogIn
