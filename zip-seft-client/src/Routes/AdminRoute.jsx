import React from 'react'
import UseAuth from '../Hooks/UseAuth'
import UseRole from '../Hooks/UseRole'
import Loading from '../Shared/Loading/Loading'
import Forbidden from '../Shared/Forbidden/Forbidden'

const AdminRoute = ({children }) => {
  const {user,loading} = UseAuth()
  const [role,isLoading] =  UseRole()

  if(loading || isLoading) return <Loading></Loading>

  if (role.role !== 'admin') return <Forbidden></Forbidden>

  return children

}

export default AdminRoute