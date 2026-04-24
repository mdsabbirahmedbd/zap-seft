import axios from 'axios'
import { useEffect } from 'react'
import UseAuth from './UseAuth'
import { replace, useNavigate } from 'react-router'

const axiosSecure =  axios.create({
    baseURL : `http://localhost:3000`
})

const UseAxiosSecure = () => {
    const {user,logoutUser} = UseAuth()
    const navigate = useNavigate()
   
    useEffect(() => {
         if(!user) return;
      const requestInterceptor =  axiosSecure.interceptors.request.use(config => {
        if(user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`
        }
        return config 
        })
     const responsInterceptor =  axiosSecure.interceptors.response.use(res => res, async error => {
        if(error.response?.status === 401 || error.response?.status === 403){
           await logoutUser()
            navigate('/login',{replace:true})
        }
        return Promise.reject(error)
     })

        return () =>{
            axiosSecure.interceptors.request.eject(requestInterceptor)
            axiosSecure.interceptors.response.eject(responsInterceptor)
        }


    },[user])

    return axiosSecure
}

export default UseAxiosSecure