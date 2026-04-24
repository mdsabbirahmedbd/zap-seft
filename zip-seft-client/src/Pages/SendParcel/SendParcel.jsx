import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

function generateTrackingId() {
  const prefix = "PARCEL"; 
  const timestamp = Date.now().toString(36).toUpperCase(); 
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}


const SendParcel = () => {
  const {user} = UseAuth();
  const allDistickServices = useLoaderData(); 
  const axiosSecure = UseAxiosSecure()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  // WATCH SELECTED REGION & DISTRICT
  const selectedSenderRegion = watch("senderRegion");
  const selectedSenderDistrict = watch("senderDistrict");

  const selectedReceiverRegion = watch("receiverRegion");
  const selectedReceiverDistrict = watch("receiverDistrict");

  // DYNAMIC DROPDOWNS
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderAreas, setSenderAreas] = useState([]);

  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverAreas, setReceiverAreas] = useState([]);

  // ------------------ SENDER REGION → DISTRICT -------------------
  useEffect(() => {
    if (selectedSenderRegion) {
      const filtered = allDistickServices.filter(
        (item) => item.region === selectedSenderRegion
      );
      setSenderDistricts(filtered);
      setSenderAreas([]);

      reset(
        { senderDistrict: "", senderCoveredArea: "" },
        { keepValues: true }
      );
    }
  }, [selectedSenderRegion]);

  // ------------------ SENDER DISTRICT → AREA -------------------
  useEffect(() => {
    if (selectedSenderDistrict) {
      const match = allDistickServices.find(
        (item) => item.district === selectedSenderDistrict
      );
      setSenderAreas(match?.covered_area || []);
    }
  }, [selectedSenderDistrict]);

  // ------------------ RECEIVER REGION → DISTRICT -------------------
  useEffect(() => {
    if (selectedReceiverRegion) {
      const filtered = allDistickServices.filter(
        (item) => item.region === selectedReceiverRegion
      );
      setReceiverDistricts(filtered);
      setReceiverAreas([]);

      reset(
        { receiverDistrict: "", receiverCoveredArea: "" },
        { keepValues: true }
      );
    }
  }, [selectedReceiverRegion]);

  // ------------------ RECEIVER DISTRICT → AREA -------------------
  useEffect(() => {
    if (selectedReceiverDistrict) {
      const match = allDistickServices.find(
        (item) => item.district === selectedReceiverDistrict
      );
      setReceiverAreas(match?.covered_area || []);
    }
  }, [selectedReceiverDistrict]);

  // SUBMIT
const onSubmit = (data) => {

  let totalcost;
  const weight = Number(data.parcelWeight);
  const sameDistrict = data.receiverDistrict === data.senderDistrict;

  // -------- COST CALCULATION --------
  if (data.type === "document") {
    totalcost = sameDistrict ? 60 : 80;
  } else {
    if (weight <= 3) {
      totalcost = sameDistrict ? 100 : 130;
    } else {
      totalcost = sameDistrict ? weight * 40 : weight * 40 + 40;
    }
  }

  // -------- SWEET ALERT --------
  Swal.fire({
    title: `Total Cost: ${totalcost}`,
    text: "Do you want to confirm this parcel?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#CAEB66",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm"
  }).then((result) => {
    if (result.isConfirmed) {
         const creation_date = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});

        const parcelData = {
            ...data, 
            totalcost ,
            created_by : user?.email,
            payment_status : 'unpaid',
            delivery_status : 'pending',
            creation_date,
            tracking_id : generateTrackingId(),
        };
        
        axiosSecure.post('/parcels',parcelData)
        .then(res =>  {
            if(res.data.result.insertedId) {
                toast.success(`Order Confirmed! Total Cost: ${totalcost}`)
                reset();
                navigate('/dashboard/myparcel')

            }
        })
        .catch(err => {
            console.log(err)
            toast.error('Failed to create order. Please try again.')
        })
         

    }

  });
};



  // ------------------ COMPONENT UI ------------------

  return (
    <div className="bg-white p-10 rounded-xl">
      <h1 className="text-4xl font-extrabold mb-10">Add Parcel</h1>
      <hr className="text-gray-300" />

      <div>
        <h1 className="text-3xl my-5 font-bold">Enter your parcel details</h1>

        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("type", { required: true })}
              className="w-4 h-4 accent-green-600"
            />
            <span className="font-semibold">Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="not-document"
              {...register("type", { required: true })}
              className="w-4 h-4 accent-green-600"
            />
            <span className="font-semibold">Not-Document</span>
          </label>
        </div>


        {errors.type && (
          <p className="text-red-500 text-sm">Please select a parcel type</p>
        )}

        <div className="flex gap-6 mb-6">
          <label className="font-semibold text-gray-700 w-full">
            Parcel Name
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", { required: true })}
              className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
            />
          </label>

          <label className="font-semibold text-gray-700 w-full">
            Parcel Weight (KG)
            <input
              type="number"
              placeholder="Parcel Weight"
              {...register("parcelWeight", { required: true })}
              className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
            />
          </label>
        </div>
      </div>

<Toaster
  position="top-center"
  reverseOrder={false}
/>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* * ---------------- SENDER ---------------- * */}
          <div>
            <h2 className="text-xl font-extrabold text-[#033F3A] mb-4">
              Sender Details
            </h2>

            <div className="space-y-4">
              <div className="lg:flex gap-3">
                <div className="flex-1">
                  <label className="font-semibold text-gray-700">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    {...register("senderName", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Sender Region
                  </label>
                  <select
                    {...register("senderRegion", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Choose Region</option>
                    {[...new Set(allDistickServices.map((d) => d.region))].map(
                      (region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Sender District */}
              <div className="lg:flex gap-3">
                <div className="flex-1">
                  <label className="font-semibold text-gray-700">
                    Sender District
                  </label>
                  <select
                    {...register("senderDistrict", { required: true })}
                    disabled={!selectedSenderRegion}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Select District</option>
                    {senderDistricts.map((d, i) => (
                      <option key={i} value={d.district}>
                        {d.district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sender Area */}
                <div>
                  <label className="font-semibold text-gray-700">
                    Covered Area
                  </label>
                  <select
                    {...register("senderCoveredArea", { required: true })}
                    disabled={!selectedSenderDistrict}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Select Area</option>
                    {senderAreas.map((a, i) => (
                      <option key={i} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address + Contact */}
              <div className="lg:flex gap-3">
                <div className="flex-1">
                  <label className="font-semibold text-gray-700">
                    Sender Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("senderAddress", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Sender Contact No
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Contact No"
                    {...register("senderContact", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  />
                </div>
              </div>

              <label className="font-bold text-xl text-gray-700">
                Pickup Instruction
              </label>
              <textarea
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
                className="border text-slate-400 border-[#CBD5E1] rounded-lg p-3 w-full h-24"
              ></textarea>
            </div>
          </div>

          {/* ---------------- RECEIVER ---------------- */}
          <div>
            <h2 className="text-xl font-extrabold text-[#033F3A] mb-4">
              Receiver Details
            </h2>

            <div className="space-y-4">
              <div className="lg:flex gap-3">
                <div className="flex-1">
                  <label className="font-semibold text-gray-700">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiverName", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Receiver Region
                  </label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Choose Region</option>
                    {[...new Set(allDistickServices.map((d) => d.region))].map(
                      (region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Receiver District */}
              <div className="lg:flex gap-3">
                <div className="flex-1">
                  <label className="font-semibold text-gray-700">
                    Receiver District
                  </label>
                  <select
                    {...register("receiverDistrict", { required: true })}
                    disabled={!selectedReceiverRegion}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Select District</option>
                    {receiverDistricts.map((d, i) => (
                      <option key={i} value={d.district}>
                        {d.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Covered Area
                  </label>
                  <select
                    {...register("receiverCoveredArea", { required: true })}
                    disabled={!selectedReceiverDistrict}
                    className="border rounded-lg p-3 w-full text-[#CBD5E1] border-[#CBD5E1]"
                  >
                    <option value="">Select Area</option>
                    {receiverAreas.map((a, i) => (
                      <option key={i} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="font-bold text-xl text-gray-700">
                Delivery Instruction
              </label>
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="border text-slate-400 border-[#CBD5E1] rounded-lg p-3 w-full h-24"
              ></textarea>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-6 mb-4">
          * Pickup Time 4pm-7pm Approx.
        </p>

        <button className="bg-[#CAEB66] cursor-pointer px-8 py-3 rounded-full font-semibold hover:bg-[#b4d85c] transition">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
