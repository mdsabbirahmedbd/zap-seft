import axios from 'axios'
import React from 'react'


const axiosIntercept =  axios.create({
    baseURL : `http://localhost:3000`
})

  
const UseAxios = () => {
  return axiosIntercept
}

export default UseAxios