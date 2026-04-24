import UseAuth from '../Hooks/UseAuth'
import { Navigate, useLocation } from 'react-router'
import Loading from '../Shared/Loading/Loading'


const PrivetRoute = ({children}) => { 
   const {user,loading} = UseAuth()
   const location = useLocation()
    if(loading) {
        return <Loading></Loading>
    }
    if(!user) {
        return <Navigate to={'/login'} state={{form : location}} replace></Navigate>
    }
    return children
}

export default PrivetRoute