import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()
const AppContextProvider=(props)=>{
     const [User,setUser] =useState(false)
     const [showLogin,setShowLogin]=useState(false)
 const [token ,setToken]=useState(localStorage.getItem('token'))
 const [credit,setCredit]=useState(false)

     const backendUrl=import.meta.env.VITE_BACKEND_URL
     const navigate=useNavigate()
 const loadCreditsData=async()=>{
    try {
        const {data}=await axios.get(backendUrl+'/api/user/credits',{headers:{token}})
        if(data.success){
            setCredit(data.credits)
            setUser(data.user)
        }
    } catch (error) {
       console.log(error)
       toast.error(error.message) 
    }
 }
// inside AppContext
const generateImage = async (
  prompt,
  {
    provider = 'openai',
    styleSuffix = '',
    size = '1024x1024',
    n = 1,
  } = {}
) => {
  try {
    // (optional) debug log
    console.log('sending opts:', { provider, styleSuffix, size, n });

    const { data } = await axios.post(
      backendUrl + '/api/image/generate-image',
      { prompt, provider, styleSuffix, size, n },
      { headers: { token } }
    );

    if (data.success) {
      loadCreditsData();
      return data.resultImage || null;
    } else {
      toast.error(data.message);
      loadCreditsData();
      if (data.creditBalance === 0) navigate('/buy');
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

 const logout=()=>{
    localStorage.removeItem('token');
    setToken('')
        setUser(null)
 }
 useEffect(()=>{
if(token){
    loadCreditsData()
}
 },[token])

     const value={
        User,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
     }
     return <AppContext.Provider value={value}>
        {props.children}

     </AppContext.Provider>

}
export default AppContextProvider