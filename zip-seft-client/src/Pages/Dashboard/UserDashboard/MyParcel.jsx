import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

 
  const {
    data: parecels,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () =>{
    const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
    return res.data;
  },
    refetchOnWindowFocus: false,
    enabled: !!user?.email,
  });

  const HandlePay = async (parcel) => {
      const  paymentInfo = {
     parcelCost : parcel?.totalcost,
     senderEmail : parcel?.created_by,
     parcelId : parcel?._id,
     parcelName : parcel?.parcelName,
    }

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    window.location.href = res.data.url
  };

  const handledelete = async (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try{
         const res = await axiosSecure.delete(`/parcelDelete/${parcel._id}`)
            if (res.data.deletedCount > 0) {
                toast.success('Successfully Delete Your Item!');
                refetch();
            }
    }
    catch(err){
       Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong.",
        });
    }

      }
    });
  };




  if (isLoading) return <Loading></Loading>;
  return (
    <div className="w-full">
      {/* Responsive Wrapper */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">#</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Title</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Type</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Created At</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Cost</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Payment</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {parecels?.map((parcel, index) => (
              <tr key={parcel._id} className="">
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {parcel.parcelName}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {parcel.type}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {parcel.creation_date}
                </td>

                <td className="px-4 py-3 font-semibold text-green-600">
                  ${parcel.totalcost}
                </td>

                <td
                  className={`px-4 py-3 font-semibold ${
                    parcel.payment_status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {
                  parcel.payment_status === "paid" ? "Paid" : <Link onClick={()=>HandlePay(parcel)}>Unpaid</Link>
                  }
                </td>

                <td className="px-4 py-3">
                 <div className="flex gap-3">
                   <Link to={'/dashboard/payment-history'} className="btn bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                    View
                  </Link>
                    {
                    parcel.payment_status === "paid" && <Link to={`/track-parcel/${parcel.tracking_id}`} className="btn btn-outline btn-primary">Track</Link>
                  }
                  <button
                    onClick={() => handledelete(parcel)}
                    className="btn btn-secondary btn-outline"
                  >
                    Delete
                  </button>
                 </div>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Version */}
        <div className="lg:hidden space-y-4 p-4">
          {parecels?.map((parcel, index) => (
            <div key={index} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Title:</span>
                <span className="capitalize">{parcel.parcelName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Type:</span>
                <span className="capitalize">{parcel.type}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Created At:</span>
                <span>{parcel.creation_date}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Cost:</span>
                <span className="font-semibold text-green-600">
                  ৳{parcel.totalcost}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Payment:</span>
                <span
                  className={`font-semibold ${
                    parcel.payment_status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <Link to={'/dashboard/payment-history'} className="btn flex-1 bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                  View
                </Link>

                {
                    parcel.payment_status === "paid" && <Link to={`/dashboard/track-parcel/${parcel._id}`} className="btn btn-outline btn-primary">Track</Link>
                  }

                <button onClick={()=> handledelete(parcel)} className="btn flex-1 btn-secondary btn-outline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyParcel;
