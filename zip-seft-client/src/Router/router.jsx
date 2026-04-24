import React from 'react'
import { createBrowserRouter } from "react-router";
import Root from '../Layouts/Root/Root';
import Home from '../Pages/Home/Home';
import AuthLayouts from '../Layouts/AuthLayouts/AuthLayouts';
import Login from '../Pages/Authpages/Login';
import Register from '../Pages/Authpages/Register';
import Covarage from '../Pages/Covarage/Covarage';
import SendParcel from '../Pages/SendParcel/SendParcel';
import PrivetRoute from '../Routes/PrivetRoute';
import Dashboard from '../Layouts/Dashboard/Dashboard';
import MyParcel from '../Pages/Dashboard/UserDashboard/MyParcel';
import Payment from '../Pages/Dashboard/Payment/Payment';
import SeccessPayment from '../Pages/Dashboard/Payment/SeccessPayment';
import CancelPayment from '../Pages/Dashboard/Payment/CancelPayment';
import PaymentHistory from '../Pages/Dashboard/Payment/PaymentHistory';
import Rider from '../Pages/Rider/Rider';
import RiderParmission from '../Pages/Rider/RiderParmission';
import UserManagment from '../Pages/Dashboard/UserDashboard/UserManagment';
import AdminRoute from '../Routes/AdminRoute';
import RiderAssingment from '../Pages/Rider/RiderAssingment';
import RiderAccount from '../Pages/Dashboard/Rider/RiderAccount';
import RiderRoute from '../Routes/RiderRoute';
import Complete_delivery from '../Pages/Dashboard/Rider/Complete_delivery';
import TrackParcel from '../Pages/SendParcel/TrackParcel';
import DashboardHome from '../Pages/Dashboard/DashboardHome';


export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children:[
            {
                index:true,
                Component: Home
            },
            {
                path:'/coverage',
                Component : Covarage,
                loader : () => fetch('./data/allDistickServices.json')
            },
            {
                path:'/sendparcel',
                Component: SendParcel,
                loader : () => fetch('./data/allDistickServices.json')
            },
            {
                path:'rider',
                element : <PrivetRoute><Rider></Rider></PrivetRoute> ,
                loader : () => fetch('./data/allDistickServices.json')
            },
            {
                path:"/track-parcel/:trackingId",
                element : <TrackParcel></TrackParcel>
            }
        ]
    },
    {
        path:'/',
        Component : AuthLayouts,
        children:[
            {
                path:'/login',
                element : <Login></Login>
            },
            {
                path:'/register',
                element : <Register></Register>
            },
        ]
    },
    {
        path:"/dashboard",
        element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
        children:[
              // this is for admin only 
           {
           path : 'dasghboard-home',
           element : <DashboardHome></DashboardHome>
           },

            {
               path:'user-managment',
               element: <AdminRoute> <UserManagment></UserManagment></AdminRoute> 
            },
            {
                path :'rider-parmission',
                element: <AdminRoute><RiderParmission></RiderParmission></AdminRoute>
            },
            {
                path:'ride-assaignment',
                element: <AdminRoute> <RiderAssingment></RiderAssingment> </AdminRoute>
            },

            // this is for rider only
            {
                path:'rider-account',
                element : <RiderRoute><RiderAccount></RiderAccount></RiderRoute>
            },
            {
                path: "complete-delivery",
                element: <RiderRoute><Complete_delivery></Complete_delivery></RiderRoute>
            }
              
            // this is for all user 
            ,
           {
            path:'myparcel',
            element: <MyParcel></MyParcel>
           },
           {
            path:'payment/:paymentId',
            element: <Payment></Payment>
           },
           {
            path:'payment-success',
            element: <SeccessPayment></SeccessPayment>
           },
           {
            path:'payment-cancel',
            element: <CancelPayment></CancelPayment>
           },
           {
            path:'payment-history',
            element: <PaymentHistory></PaymentHistory>
           }
        ]
    }
])

