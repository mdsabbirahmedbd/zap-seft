import React from 'react'
import UseAuth from '../../../Hooks/UseAuth'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';


const PaymentHistory = () => {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {data : payments, isLoading} = useQuery({
      queryKey: ['payments', user?.email],
      queryFn: async () => {
        const res = await axiosSecure(`/payment-history?email=${user?.email}`); 
        return res.data;
      }
    })
 if (isLoading)  return <Loading></Loading>;
  

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
              <th className="px-4 py-3 text-gray-700 font-semibold">Amount</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Traking ID</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Transaction ID</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment, index) => (
              <tr key={payment._id} className="">
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  {payment.parcelName}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                  ${payment.amount}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {payment.traking_Id}
                </td>

                <td className="px-4 py-3 font-semibold text-green-600">
                  {payment.transactionId}
                </td>


                <td className="px-4 py-3">
                    <Link to={`/dashboard/payment/${payment.parcelId}`}>
                  <button className="btn bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                    View
                  </button>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Version */}
        <div className="lg:hidden space-y-4 p-4">
          {payments?.map((payment, index) => (
            <div key={index} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Name:</span>
                <span className="capitalize">{payment.parcelName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Amount:</span>
                <span className="capitalize">${payment.amount}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Traking ID:</span>
                <span>{payment.traking_Id}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Transaction ID:</span>
                <span className="font-semibold text-green-600">
                  {payment.transactionId}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn flex-1 bg-white border-[#CAEB66] text-[#769a03] hover:bg-[#CAEB66] hover:text-white">
                  View
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

export default PaymentHistory