import UseAuth from './UseAuth'
import UseAxiosSecure from './UseAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const UseRole = () => {
    const {user} = UseAuth()
    const axiosSecure  = UseAxiosSecure()
    const {data : role ,isLoading} = useQuery({
        queryKey:['user-role',user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/user/${user.email}/role`)
            return res.data 
        },
        enabled: !!user?.email,
    })


    return [role,isLoading]
    
}

export default UseRole