import React from 'react'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'
import UseAuth from '../../../Hooks/UseAuth'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

const RiderAccount = () => {
  const {user} = UseAuth()
  const axiosSecure = UseAxiosSecure()
   
  const {data : parcels = [] ,isLoading,refetch} = useQuery({
    queryKey:['parcels',user?.email , 'Driver_Assigned'],
    queryFn : async () => {
        const res = await axiosSecure.get(`/assigned-rides?riderEmail=${user?.email}&delivaryStatus=Driver_Assigned`);
        return res.data 
    }
  })

   const getStatusBadge = (status) => {
    const styles = {
      Driver_Assigned: "bg-blue-100 text-blue-700",
      On_The_Way: "bg-yellow-100 text-yellow-700",
      Delivered: "bg-green-100 text-green-700",
      Pending: "bg-gray-100 text-gray-600",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };


  const handleAccept = (parcel) => {

  const nextStatus = {
    'Driver_Assigned': 'On_The_Way',
    'On_The_Way': 'Picked_Up',
    'Picked_Up': 'Delivered',
  }

  const nextStatusLabels = {
    'Driver_Assigned': 'Accept Delivery',
    'On_The_Way': 'Mark as Picked Up',
    'Picked_Up': 'Mark as Delivered',
  }

  const next = nextStatus[parcel.delivery_status]
  if (!next) return  


    Swal.fire({
      title: nextStatusLabels[parcel.delivery_status],
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/rider-action/${parcel._id}/status`, {
            delivery_status: next,
            riderId : parcel.riderId,
            trackingId : parcel.tracking_id
          });
          if (res.data.modifiedCount) {
            toast.success(`Status updated to ${next}!`);
            refetch();
          }
        } catch {
          toast.error("Failed to accept.");
        }
      }
    });

  }


  const handleReject = (parcel)  => {
     Swal.fire({
      title: "Accept this delivery?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/rider-action/${parcel._id}/status`, {
            delivery_status: "Pending",
          });
          if (res.data.modifiedCount) {
            toast.success("Delivery accepted!");
            refetch();
          }
        } catch {
          toast.error("Failed to accept.");
        }
      }
    });

  }

  return (
     <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="overflow-x-auto bg-white rounded-lg shadow">

        {/* Desktop Table */}
        <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">#</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Parcel</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Sender</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Receiver</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Route</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Accept</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Reject</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id} className="border-t">
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>

                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 capitalize">{parcel.parcelName}</p>
                  <p className="text-xs text-gray-400 font-mono">{parcel.tracking_id}</p>
                  <p className="text-xs text-gray-500">{parcel.parcelWeight} kg</p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 capitalize">{parcel.senderName}</p>
                  <p className="text-xs text-gray-500">{parcel.senderContact}</p>
                  <p className="text-xs text-gray-400">{parcel.senderCoveredArea}, {parcel.senderDistrict}</p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 capitalize">{parcel.receiverName}</p>
                  <p className="text-xs text-gray-400">{parcel.receiverCoveredArea}, {parcel.receiverDistrict}</p>
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  <span>{parcel.senderRegion}</span>
                  <span className="mx-1 text-gray-400">→</span>
                  <span>{parcel.receiverRegion}</span>
                </td>

                <td className="px-4 py-3">{getStatusBadge(parcel.delivery_status)}</td>

             <td className="px-4 py-3">
  {parcel.delivery_status !== 'Delivered' ? (
    <button
      onClick={() => handleAccept(parcel)}
      className={`btn btn-sm
        ${parcel.delivery_status === 'Driver_Assigned' ? 'bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white' : ''}
        ${parcel.delivery_status === 'On_The_Way' ? 'btn-outline btn-warning' : ''}
        ${parcel.delivery_status === 'Picked_Up' ? 'btn-outline btn-success' : ''}
      `}
    >
      {parcel.delivery_status === 'Driver_Assigned' && 'Accept'}
      {parcel.delivery_status === 'On_The_Way' && 'Picked Up'}
      {parcel.delivery_status === 'Picked_Up' && 'Delivered'}
    </button>
  ) : (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
      Completed
    </span>
  )}
</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleReject(parcel)}
                    disabled={parcel.delivery_status === 'Delivered'}
                    className="btn btn-sm btn-outline btn-error disabled:opacity-40"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-4 p-4">
          {parcels?.map((parcel, index) => (
            <div key={parcel._id} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold capitalize">{parcel.parcelName}</p>
                  <p className="text-xs font-mono text-gray-400">{parcel.tracking_id}</p>
                </div>
                {getStatusBadge(parcel.delivery_status)}
              </div>

              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold text-gray-600">Sender:</span>
                <span className="capitalize">{parcel.senderName} — {parcel.senderDistrict}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold text-gray-600">Receiver:</span>
                <span className="capitalize">{parcel.receiverName} — {parcel.receiverDistrict}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span className="font-semibold text-gray-600">Route:</span>
                <span>{parcel.senderRegion} → {parcel.receiverRegion}</span>
              </div>

              <div className="flex gap-2 mt-3">
             <button
    onClick={() => handleStatusChange(parcel)}
  disabled={parcel.delivery_status === 'Delivered'}
  className="btn flex-1 btn-sm bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] disabled:opacity-40"
           >
  {parcel.delivery_status === 'Driver_Assigned' && 'Accept'}
  {parcel.delivery_status === 'On_The_Way' && 'Picked Up'}
  {parcel.delivery_status === 'Picked_Up' && 'Delivered'}
  {parcel.delivery_status === 'Delivered' && 'Completed'}
          </button>
                <button
                  onClick={() => handleReject(parcel)}
                  disabled={parcel.delivery_status === 'Delivered'}
                  className="btn flex-1 btn-sm btn-outline btn-error disabled:opacity-40"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default RiderAccount