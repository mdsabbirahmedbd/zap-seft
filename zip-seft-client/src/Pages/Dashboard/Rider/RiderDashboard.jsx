import React from 'react'
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, CheckCircle, Clock } from 'lucide-react';
import Loading from '../../../Shared/Loading/Loading';

const RiderDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: riderData = {}, isLoading } = useQuery({
    queryKey: ['rider-delivery-chart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-delivery-chart?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <Loading />;

  const totalDeliveries = riderData.totalDeliveries || 0;
  const totalEarned = riderData.totalEarned || 0;
  const payout = riderData.payout || 0;

  const chartData = [
    { name: 'Delivered', count: totalDeliveries, fill: '#639922' },
    { name: 'Earned ($)', count: totalEarned,    fill: '#378ADD' },
    { name: 'Payout ($)', count: payout,         fill: '#EF9F27' },
  ];

  const statCards = [
    {
      label: 'Total Deliveries',
      value: totalDeliveries,
      icon: Package,
      bg: 'bg-blue-50', iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700', textColor: 'text-blue-700',
      border: 'border-blue-200'
    },
    {
      label: 'Total Earned',
      value: `$${totalEarned}`,
      icon: CheckCircle,
      bg: 'bg-green-50', iconBg: 'bg-green-100',
      iconColor: 'text-green-700', textColor: 'text-green-700',
      border: 'border-green-200'
    },
    {
      label: 'My Payout (30%)',
      value: `$${payout}`,
      icon: Clock,
      bg: 'bg-amber-50', iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700', textColor: 'text-amber-700',
      border: 'border-amber-200'
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {user?.displayName}</h1>
        <p className="text-sm text-gray-500 mt-1">Here's your delivery overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`${card.bg} ${card.border} border rounded-xl p-5 flex flex-col gap-3`}>
              <div className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon size={20} className={card.iconColor} />
              </div>
              <div>
                <p className={`text-3xl font-semibold ${card.textColor}`}>{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-6">Delivery Overview</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '0.5px solid #e5e7eb', fontSize: 13 }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Earnings Summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-4">Earnings Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Total Parcel Value</p>
            <p className="text-2xl font-semibold text-gray-800">${totalEarned}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Your Payout (30%)</p>
            <p className="text-2xl font-semibold text-green-700">${payout}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RiderDashboard;