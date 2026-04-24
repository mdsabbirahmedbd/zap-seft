import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import riderImg from "../../assets/agent-pending.png"; 

const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const allDistickServices = useLoaderData();
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const selectedRegion = watch("region");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = allDistickServices.filter(
        (item) => item.region === selectedRegion
      );
      setDistricts(filtered);
      reset({ district: "" }, { keepValues: true });
    }
  }, [selectedRegion]);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      email: user?.email,
      status: "pending",
      applied_at: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
    };

    try{
        const res = await axiosSecure.post("/rider",riderData)
        console.log(res.data)
        if(res.data.result.insertedId){
            toast.success("Application submitted successfully!");
             navigate('/dashboard')
            reset();
        }
    }
    catch(error){
       toast.error("Failed to submit. Please try again.");
    }

  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="my-10 items-center max-w-lg">
        <div>
          <h1 className="text-4xl font-extrabold text-[#033F3A] mb-3">Be a Rider</h1>
          <p className="text-gray-500">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
      </div>
       
<section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
  
  {/* Left — Form */}
  <div>
    <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Name */}
      <div>
        <label className="font-semibold text-gray-700">Your Name</label>
        <input
          type="text"
          placeholder="Your Name"
          {...register("name", { required: true })}
          className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
      </div>

      {/* Driving License */}
      <div>
        <label className="font-semibold text-gray-700">Driving License Number</label>
        <input
          type="text"
          placeholder="Driving License Number"
          {...register("drivingLicense", { required: true })}
          className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
        />
        {errors.drivingLicense && <p className="text-red-500 text-sm">License number is required</p>}
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold text-gray-700">Your Email</label>
        <input
          type="email"
          placeholder="Your Email"
          defaultValue={user?.email}
          {...register("email", { required: true })}
          className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
        />
      </div>

      {/* Region + District — একই row এ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-gray-700">Your Region</label>
          <select
            {...register("region", { required: true })}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
          >
            <option value="">Select your Region</option>
            {[...new Set(allDistickServices.map((d) => d.region))].map((region, i) => (
              <option key={i} value={region}>{region}</option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Your District</label>
          <select
            {...register("district", { required: true })}
            disabled={!selectedRegion}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1 disabled:opacity-40"
          >
            <option value="">Select your District</option>
            {districts.map((d, i) => (
              <option key={i} value={d.district}>{d.district}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">District is required</p>}
        </div>
      </div>

      {/* NID + Phone — একই row এ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-gray-700">NID No</label>
          <input
            type="text"
            placeholder="NID"
            {...register("nid", { required: true })}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
          />
          {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
        </div>
      </div>

      {/* Bike Brand + Registration — একই row এ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-gray-700">Bike Brand Model and Year</label>
          <input
            type="text"
            placeholder="Bike Brand Model and Year"
            {...register("bikeBrand", { required: true })}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
          />
          {errors.bikeBrand && <p className="text-red-500 text-sm">Bike info is required</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Bike Registration Number</label>
          <input
            type="text"
            placeholder="Bike Registration Number"
            {...register("bikeRegistration", { required: true })}
            className="border rounded-lg p-3 w-full border-[#CBD5E1] mt-1"
          />
          {errors.bikeRegistration && <p className="text-red-500 text-sm">Registration is required</p>}
        </div>
      </div>

      {/* About */}
      <div>
        <label className="font-semibold text-gray-700">Tell Us About Yourself</label>
        <textarea
          placeholder="Tell Us About Yourself"
          {...register("about")}
          className="border border-[#CBD5E1] rounded-lg p-3 w-full h-24 mt-1"
        />
      </div>

      <button
        type="submit"
        className="bg-[#CAEB66] cursor-pointer w-full py-3 rounded-lg font-semibold hover:bg-[#b4d85c] transition"
      >
        Submit
      </button>

    </form>
  </div>

  {/* Right — Image */}
  <div className="hidden lg:flex items-center justify-center sticky top-10">
    <img
      src={riderImg}
      className="w-3/4 max-w-sm"
      alt="rider"
    />
  </div>

</section>




    </div>
  );
};

export default BeARider;