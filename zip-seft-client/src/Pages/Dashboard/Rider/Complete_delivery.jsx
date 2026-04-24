import React from 'react'
import UseAuth from '../../../Hooks/UseAuth'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';

const Complete_delivery = () => {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {data : parcels = [],isLoading} =  useQuery({
         queryKey:['parcels',user?.email , 'Delivered'],
       queryFn : async () => {
        const res = await axiosSecure.get(`/assigned-rides?riderEmail=${user?.email}&delivaryStatus=Delivered`);
        return res.data 
      }
    })

  const RIDER_COMMISSION = 0.3;

  const totalEarnings = parcels.reduce(
    (sum, p) => sum + p.totalcost * RIDER_COMMISSION, 0
   );

  if (isLoading) return <Loading></Loading>




  return (
     <div className="w-full space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">Total Deliveries</p>
          <p className="text-2xl font-semibold text-gray-800">{parcels.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">Total Earned</p>
          <p className="text-2xl font-semibold text-green-600">
            ${totalEarnings.toFixed(0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 col-span-2 md:col-span-1">
          <p className="text-xs text-gray-400 mb-1">Commission Rate</p>
          <p className="text-2xl font-semibold text-blue-600">30%</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">#</th>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">Parcel</th>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">Delivered</th>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">Pickup</th>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">Cost</th>
              <th className="px-5 py-3 text-xs text-gray-400 uppercase tracking-wide">Payout (30%)</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-gray-500">{index + 1}</td>

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800 capitalize">{parcel.parcelName}</p>
                  <p className="text-xs text-gray-400 font-mono">{parcel.tracking_id}</p>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {parcel.creation_date}
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-gray-800">{parcel.senderDistrict}</p>
                  <p className="text-xs text-gray-400">{parcel.senderCoveredArea}</p>
                </td>

                <td className="px-5 py-4 font-medium text-gray-800">
                  ${parcel.totalcost}
                </td>

                <td className="px-5 py-4">
                  <span className="font-semibold text-green-600">
                    ${(parcel.totalcost * RIDER_COMMISSION).toFixed(0)}
                  </span>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-50 border-t-2 border-gray-200">
              <td colSpan={4} className="px-5 py-4 font-semibold text-gray-600 text-right">
                Total
              </td>
              <td className="px-5 py-4 font-bold text-gray-800">
                ${parcels.reduce((sum, p) => sum + p.totalcost, 0)}
              </td>
              <td className="px-5 py-4 font-bold text-green-600">
                ${totalEarnings.toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-3 p-4">
          {parcels.map((parcel) => (
            <div key={parcel._id} className="rounded-lg p-4 bg-gray-50 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium capitalize">{parcel.parcelName}</p>
                  <p className="text-xs font-mono text-gray-400">{parcel.tracking_id}</p>
                </div>
                <span className="font-semibold text-green-600">
                  ${(parcel.totalcost * RIDER_COMMISSION).toFixed(0)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <div>
                  <span className="text-gray-400">Date: </span>
                  <span>{parcel.creation_date}</span>
                </div>
                <div>
                  <span className="text-gray-400">Pickup: </span>
                  <span>{parcel.senderDistrict}</span>
                </div>
                <div>
                  <span className="text-gray-400">Cost: </span>
                  <span>${parcel.totalcost}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Total */}
          <div className="rounded-lg p-4 bg-green-50 border border-green-100 flex justify-between">
            <span className="font-semibold text-gray-700">Total Earned</span>
            <span className="font-bold text-green-600">${totalEarnings.toFixed(0)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Complete_delivery