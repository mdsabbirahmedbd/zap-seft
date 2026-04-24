import Logo from '../../Shared/Logo'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';

const Login = () => {
    const  { register,handleSubmit,formState:{errors}} = useForm()
    const {loginwithGoogle,singinUser} = UseAuth()
    const form = location.state?.from?.pathname || '/'
    const naviget = useNavigate()


    const onSubmit = (data)=> {
        singinUser(data.email,data.password)
        .then((res) => {
            naviget(form,{replace:true})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const createwithGoogle = () => {
        loginwithGoogle()
        .then((res) => {
            const userInfo = {
        displayName : res.user.displayName,
        email : res.user.email
      }
            naviget(form,{replace:true})
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (

    <div>
        <div className="absolute top-6 left-6">
          <Logo />
        </div>

        <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-black mb-8">Login with Profast</p>

     <form onSubmit={handleSubmit(onSubmit)}>
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
           { errors.email?.type === 'required' && <p className='text-red-500'>Please Fill Email</p>}

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

          <a href="#" className="text-sm text-[#71717AFF] mb-4 underline underline-offset-4 inline-block">
            Forgot Password?
          </a>

          <button type='submit' className="bg-[#CAEB66FF] cursor-pointer  text-black py-3 rounded-lg w-full font-medium">
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Don't have any account? <Link to={'/register'} className="text-[#8FA748FF]">Register</Link>
          </p>

          <div className="flex items-center justify-center my-4">
            <span className="px-2 text-gray-500 text-sm">Or</span>
          </div>

     </form>
          <button onClick={createwithGoogle} className="cursor-pointer  font-medium p-3 rounded-lg w-full flex items-center justify-center gap-2 bg-[#E9ECF1] shadow-sm">
            <FcGoogle /> Login with Google
          </button>
        </div>
      </div>    
  )
}

export default Login