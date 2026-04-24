import React from 'react'
import { useForm } from 'react-hook-form'
import userimg from "../../assets/image-upload-icon.png"
import { FcGoogle } from 'react-icons/fc'
import Logo from '../../Shared/Logo'
import { Link, useNavigate } from 'react-router'
import UseAuth from '../../Hooks/UseAuth'
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
   const naviget  = useNavigate()
    const {register,handleSubmit,formState:{errors}}  = useForm()
    const {createUser,loginwithGoogle} = UseAuth()
    const axiosSecure  = UseAxiosSecure()

  const from = location.state?.from?.pathname || '/'
const hangle_register = async (data) => {
  try {
    const res = await createUser(data.email, data.password);
    
    const userInfo = {
      displayName: res.user.displayName || data.name,
      email: res.user.email
    };

    const dbRes = await axiosSecure.post('/users', userInfo);  // ✅ axiosPublic
    console.log(dbRes.data);
    toast.success('User created successfully!');
    navigate(from, { replace: true });

  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};


const createwithGoogle = async () => {
  try {
    const res = await loginwithGoogle();

    const userInfo = {
      displayName: res.user.displayName,
      email: res.user.email
    };

    const dbRes = await axiosSecure.post('/users', userInfo);  // ✅ axiosPublic
    console.log(dbRes.data);
    toast.success('Login successful!');
    navigate(from, { replace: true });

  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};




  return (
    <div>
        <div className="absolute top-6 left-6">
          <Logo />
        </div>

        <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Create an Account</h1>
          <p className="text-black mb-8">Register with Profast</p>
          <img src={userimg} alt="" />

     <form onSubmit={handleSubmit(hangle_register)}>

        {/* name  */}

        <label className="text-sm font-medium">Name</label>
        <input
         className="border border-[#CBD5E1] p-3 rounded-lg w-full mt-1 mb-4"
         type="text" placeholder='Name' {...register('name',{ required:true})} />
         { errors.text?.type === 'required' && <p className='text-red-500'>Please Write Your Name</p>}


         {/* Email */}
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register('email',{
                required:true
            })}
            className="border border-[#CBD5E1] p-3 rounded-lg w-full mt-1 mb-4"
          />
           { errors.email?.type === 'required' && <p className='text-red-500'>Please Inter Email</p>}

          {/* Password */}
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
             {...register('password',{
                required: true,
                minLength : 6,
             })}
            className="border p-3 border-[#CBD5E1]  rounded-lg w-full mt-1 mb-2"
          />

          { errors.password?.type === 'required' && <p className='text-red-500'>Password Required</p>}
          { errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 Charectors</p>}

          <button type='submit' className="bg-[#CAEB66FF] cursor-pointer  text-black py-3 rounded-lg w-full font-medium">
            Register
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account? <Link to={'/login'} className="text-[#8FA748FF]">Login</Link>
          </p>

          <div className="flex items-center justify-center my-4">
            <span className="px-2 text-gray-500 text-sm">Or</span>
          </div>

     </form>
          <button onClick={createwithGoogle} className="cursor-pointer  font-medium p-3 rounded-lg w-full flex items-center justify-center gap-2 bg-[#E9ECF1] shadow-sm">
            <FcGoogle /> Register with Google
          </button>
        </div>
      </div>  
  )
}

export default Register