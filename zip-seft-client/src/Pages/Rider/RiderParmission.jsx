import React from 'react'
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import { MdDelete } from "react-icons/md";

const RiderParmission = () => {
    const axiosSecure  = UseAxiosSecure()

    const {data:riders = [], refetch} = useQuery({
        queryKey: ['riders','pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-riders')
            return res.data
        }
    })

    const handleAccept = async (rider) => {
        try{
            const status = {status: "approved" , email : rider.email}
            const res = await axiosSecure.patch(`/update-rider/${rider._id}`,status)
            if(res.data.modifiedCount){
                toast.success('Rider approved successfully')
                refetch()
            
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const handleRejected = async (rider) => {
        try{
            const status = {status: "rejected" , email : rider.email}
            const res = await axiosSecure.patch(`/update-rider/${rider._id}`,status)
            if(res.data.modifiedCount){
                toast.success('Rider rejected successfully')
                refetch()
            
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }



  return (
    <div>
   <div className="w-full">
      {/* Responsive Wrapper */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">#</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Name</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">District</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Accept</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Reject</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Delete</th>

            </tr>
          </thead>

          <tbody>
            {riders?.map((rider, index) => (
              <tr key={rider._id} className="">
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {rider.name}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 ">
                  {rider.email}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {rider.district}
                </td>

                <td className="px-4 py-3 font-semibold">
  <span className={`px-3 py-1 rounded-full text-sm font-medium
    ${rider.status === 'approved' 
      ? 'bg-green-100 text-green-700' 
      : rider.status === 'rejected'
      ? 'bg-red-100 text-red-700'
      : 'bg-yellow-100 text-yellow-700'  // pending
    }`}>
    {rider.status}
  </span>
</td>



                 <td className="px-4 py-3">
                  <button  onClick={()=>handleAccept(rider)} className="btn bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                    Accept
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button onClick={()=>handleRejected(rider)} className="btn btn-outline btn-primary">Reject</button>
                </td>

                <td className="px-4 py-3">
                  <button
                    className="btn btn-secondary btn-outline"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Version */}
        <div className="lg:hidden space-y-4 p-4">
          {riders?.map((rider, index) => (
            <div key={index} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Name:</span>
                <span className="capitalize">{rider.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Email:</span>
                <span className="capitalize">{rider.email}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">District:</span>
                <span>{rider.district}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Status : </span>
                <span className="font-semibold text-green-600">
                  {rider.status}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn flex-1 bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                  Accept
                </button>

                <button className="btn flex-1 btn-outline btn-primary">
                  Reject
                </button>

                <button onClick={()=> handledelete(parcel)} className="btn flex-1 btn-secondary btn-outline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div> 



      </div>
    </div>



    
    </div>

  )
}

export default RiderParmission