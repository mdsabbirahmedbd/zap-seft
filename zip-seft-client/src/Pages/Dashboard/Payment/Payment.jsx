import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';

const Payment = () => {
  const { paymentId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ['payment', paymentId],
    queryFn: async () => {
      const res = await axiosSecure(`/parcel-payment/${paymentId}`);
      return res.data;
    }
  });



  if (isLoading) return <Loading />;

  return (
    <div className="max-w-2xl border border-green-50 rounded-2xl mx-auto p-4 flex flex-col gap-4">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">Parcel payment</p>
          <h1 className="text-xl font-semibold capitalize">{parcel?.parcelName}</h1>
          <div className="flex gap-2 mt-2">
            <span className="badge bg-green-200 ">{parcel?.payment_status}</span>
            <span className="badge bg-yellow-100 text-yellow-700">{parcel?.delivery_status}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Tracking ID</p>
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{parcel?.tracking_id}</span>
        </div>
      </div>

      {/* Sender & Receiver */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white  rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Sender</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
              {parcel?.senderName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium capitalize">{parcel?.senderName}</p>
              <p className="text-xs text-gray-500">{parcel?.senderContact}</p>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-gray-500">Region</span><span className="font-medium">{parcel?.senderRegion}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">District</span><span className="font-medium">{parcel?.senderDistrict}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Area</span><span className="font-medium">{parcel?.senderCoveredArea}</span></div>
          </div>
        </div>

        <div className="bg-white  rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Receiver</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium">
              {parcel?.receiverName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium capitalize">{parcel?.receiverName}</p>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-gray-500">Region</span><span className="font-medium">{parcel?.receiverRegion}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">District</span><span className="font-medium">{parcel?.receiverDistrict}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Area</span><span className="font-medium">{parcel?.receiverCoveredArea}</span></div>
          </div>
        </div>
      </div>

      {/* Parcel Details */}
      <div className="bg-white  rounded-xl p-4 text-sm space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Parcel details</p>
        <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium capitalize">{parcel?.type}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Weight</span><span className="font-medium">{parcel?.parcelWeight} kg</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Created</span><span className="font-medium">{parcel?.creation_date}</span></div>
      </div>

      {/* Pay Now */}
      <div className="bg-white  rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Total amount</span>
          <span className="text-2xl font-semibold">${parcel?.totalcost}</span>
        </div>
        <button  onClick={() => navigate('/')}
          className="w-full cursor-pointer py-3 bg-[#CAEB66] text-[#2a3d00] font-medium rounded-lg hover:bg-[#b8d94f] transition-colors"
        >
          Home 
        </button>
      </div>

    </div>
  );
};

export default Payment;