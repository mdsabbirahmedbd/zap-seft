import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const statusConfig = {
  pending: {
    label: "To Pay",
    icon: Clock,
    bg: "bg-amber-50",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    border: "border-amber-300",
    count_color: "text-amber-700",
  },
  Driver_Assigned: {
    label: "Ready Pick Up",
    icon: Package,
    bg: "bg-blue-50",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
    border: "border-blue-300",
    count_color: "text-blue-700",
  },
  On_The_Way: {
    label: "In Transit",
    icon: Truck,
    bg: "bg-purple-50",
    iconColor: "text-purple-700",
    iconBg: "bg-purple-100",
    border: "border-purple-300",
    count_color: "text-purple-700",
  },
  Delivered: {
    label: "Delivered",
    icon: CheckCircle,
    bg: "bg-green-50",
    iconColor: "text-green-700",
    iconBg: "bg-green-100",
    border: "border-green-300",
    count_color: "text-green-700",
  },
};
const Admin_Charts_Dashboard = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: status = [], isLoading: statusLoading } = useQuery({
    queryKey: ["parcel-status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel-status");
      return res.data;
    },
  });

  const statusMap = status.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const cards = [
    { key: "pending", ...statusConfig.pending },
    { key: "Driver_Assigned", ...statusConfig.Driver_Assigned },
    { key: "On_The_Way", ...statusConfig.On_The_Way },
    { key: "Delivered", ...statusConfig.Delivered },
  ];

   const chartData = [
  { name: 'Pending',         value: statusMap['pending'] || 0 },
  { name: 'Driver Assigned', value: statusMap['Driver_Assigned'] || 0 },
  { name: 'On The Way',      value: statusMap['On_The_Way'] || 0 },
  { name: 'Delivered',       value: statusMap['Delivered'] || 0 },
];
 if (statusLoading) return <Loading></Loading>

  return (

     <div>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-1">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">
              You can access all your data and information from anywhere.
            </p>
          </div>
    
          {/* Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              const count = statusMap[card.key] || 0;
    
              return (
                <div
                  key={card.key}
                  className={`${card.bg} ${card.border} border rounded-xl p-5 flex flex-col gap-3`}
                >
                  {/* Icon */}
                  <div className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className={card.iconColor} />
                  </div>
    
                  {/* Count + Label */}
                  <div>
                    <p className={`text-3xl font-semibold ${card.count_color}`}>
                      {count}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
    
         <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-base font-medium text-gray-700 mb-4">Parcel Overview</h2>
      <AreaChart
         style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        data={chartData}  
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        onContextMenu={(_, e) => e.preventDefault()}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"  
          stroke="#CAEB66"
          fill="#CAEB66"
          fillOpacity={0.4}
        />
      </AreaChart>
    </div>
    
    
    
          
        </div>
  );
};

export default Admin_Charts_Dashboard;
