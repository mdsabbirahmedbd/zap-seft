import { RiRestaurant2Line } from 'react-icons/ri';
import UseRole from '../../Hooks/UseRole';
import Admin_Charts_Dashboard from './Admin_Charts_Dashboard';
import RiderDashboard from './Rider/RiderDashboard';



const DashboardHome = () => {

    const [role,isLoading] = UseRole()

   if (role.role == 'admin') return <Admin_Charts_Dashboard></Admin_Charts_Dashboard>
   if (role.role == 'rider') return <RiderDashboard></RiderDashboard>
};

export default DashboardHome;