import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext/AuthContext'

const UseAuth = () => {
    const authinformation = useContext(AuthContext)
    return authinformation
}

export default UseAuth