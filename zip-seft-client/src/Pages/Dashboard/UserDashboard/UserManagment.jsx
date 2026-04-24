import React, { use, useState } from 'react'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

const UserManagment = () => {
  const [searchText,setSearthText] = useState('');
    const axiosSecure = UseAxiosSecure();

    const {data: users = [],refetch} = useQuery({
        queryKey: ['users',searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?searchText=${searchText}`);
            return res.data
        }
    })


    const handleRoleChange =  (user,new_role) =>{
      Swal.fire({
      title: `Make ${user.displayName} a ${new_role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/update-role/${user._id}`, {role : new_role} );
          if (res.data.modifiedCount ) {
            toast.success(`Role updated to ${new_role}!`);
            refetch();
          }
        } catch {
          toast.error("Failed to update role.");
        }
      }
    });
    }

    const handleDelete = (user) => {
        Swal.fire({
      title: `Make ${user.displayName} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try{
                const res = await axiosSecure.delete(`/delete-user/${user._id}`);
                if(res.data.deletedCount){
                   toast.success('User deleted successfully');
                   refetch(); 
                }
            }
            catch(error){
                toast.error(error.message);
            }
        }
    })
    }

    const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",
      rider: "bg-blue-100 text-blue-700",
      user: "bg-gray-100 text-gray-600",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[role] || styles.user}`}>
        {role}
      </span>
    );
  };


  return (
    <div className="w-full">

      <div className='my-5'>
        <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g></svg>
  <input onChange={(e)=>setSearthText(e.target.value)} type="search"  placeholder="Search Here" />
</label>
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <div className="overflow-x-auto bg-white rounded-lg shadow">

        {/* Desktop Table */}
        <table className="w-full text-left hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">#</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Name</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Joined</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Role</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Make Role</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800 capitalize">
                      {user.displayName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-700">{user.email}</td>

                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(user.creation_date).toLocaleDateString("en-GB")}
                </td>

                <td className="px-4 py-3">{getRoleBadge(user.role)}</td>

                {/* Role dropdown */}
                <td className="px-4 py-3">
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-4 p-4">
          {users?.map((user, index) => (
            <div key={user._id} className="rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold capitalize">{user.displayName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold text-gray-600">Joined:</span>
                <span>{new Date(user.creation_date).toLocaleDateString("en-GB")}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span className="font-semibold text-gray-600">Role:</span>
                {getRoleBadge(user.role)}
              </div>

              <div className="flex gap-2 mt-3">
                <select
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="user">User</option>
                  <option value="rider">Rider</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => handleDelete(user)}
                  className="btn btn-sm btn-error btn-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default UserManagment