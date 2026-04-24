import React from 'react'
import UseAuth from '../Hooks/UseAuth'
import UseRole from '../Hooks/UseRole'
import Loading from '../Shared/Loading/Loading'
import Forbidden from '../Shared/Forbidden/Forbidden'

const RiderRoute = ({children }) => {
  const {user,loading} = UseAuth()
  const [role,isLoading] =  UseRole()

  if(loading || isLoading) return <Loading></Loading>

  if (role.role !== 'rider') return <Forbidden></Forbidden>

  return children

}

export default RiderRoute