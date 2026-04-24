import UseAxiosSecure from '../../Hooks/UseAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const RiderAssingment = () => {
    const [selectedParcel , setSelectedParcel] = useState(null)
    const modalRef = useRef()
    const axiosSecure = UseAxiosSecure()
    const {data : parcels = [] , refetch} = useQuery({
        queryKey : ['parcels','pending'],
        queryFn : async () => {
            const res = await axiosSecure.get("/parcels?delivaryStatus=pending");
            return res.data
        }
    })

    const {data : riders = []} = useQuery({
        queryKey : ['riders',selectedParcel?.senderDistrict,'available'],
        enabled : !!selectedParcel,
        queryFn : async () => {
            const res = await axiosSecure.get(`/all-riders?status=approved&district=${selectedParcel?.senderDistrict}&work_status=available`);
            return res.data
        }
    })


    const handleAssigned = (parcel) => {
        setSelectedParcel(parcel)
        modalRef.current.showModal()
    }

    const AssignedRider = (rider) => {

      const riderInfo = {
        riderId : rider._id,
        riderName : rider.name,
        riderEmail : rider.email,
        parcelId : selectedParcel._id,
        trackingId : selectedParcel.tracking_id
      }
      axiosSecure.patch(`/rider-assigned/${selectedParcel._id}`,riderInfo)
      .then(res => {
             if(res.data.modifiedCount){
                   toast.success('Rider assigned successfully')
                   modalRef.current.close()
                   refetch()
             }
      })
      .catch(error => {
        toast.error(error.message)
      })
    
          
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
              <th className="px-4 py-3 text-gray-700 font-semibold">Cost</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Picket District</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Assign </th>
            </tr>
          </thead>

          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id} className="">
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {parcel.parcelName}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {parcel.created_by}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  ${parcel.totalcost}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {parcel.receiverDistrict}
                </td>


                 <td className="px-4 py-3">
                  <button onClick={()=>handleAssigned(parcel)}   className="btn bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                      Assign Rider
                  </button>
                </td>

              

              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Version */}
        <div className="lg:hidden space-y-4 p-4">
          {parcels?.map((parcel, index) => (
            <div key={index} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Name:</span>
                <span className="capitalize">{parcel.parcelName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Email:</span>
                <span className="capitalize">{parcel.created_by}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Cost:</span>
                <span>${parcel.totalcost}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Pickup District : </span>
                <span className="font-semibold text-green-600">
                  {parcel.receiverDistrict}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>handleAssigned(parcel)}  className="btn flex-1 bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                  Assign Rider
                </button>


              </div>
            </div>
          ))}
        </div> 



      </div>
    </div>
<dialog ref={modalRef}  id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <p className="py-4">{riders.length} </p>
    <div>
         <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">Name</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Assign </th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, index) => (
              <tr key={rider._id} className="">
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {rider.name}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {rider.email}
                </td>

                 <td className="px-4 py-3">
                  <button onClick={()=>AssignedRider(rider)}   className="btn bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                      Assign Rider
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

    </div>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default RiderAssingment