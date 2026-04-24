import React from 'react'
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const statusConfig = {
  Pending_Delivery: {
    label: 'Pending Delivery',
    icon: '🕐',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
  },
  Driver_Assigned: {
    label: 'Driver Assigned',
    icon: '🧑‍✈️',
    color: '#185FA5',
    bg: '#E6F1FB',
    border: '#378ADD',
  },
  On_The_Way: {
    label: 'On The Way',
    icon: '🚴',
    color: '#3C3489',
    bg: '#EEEDFE',
    border: '#7F77DD',
  },
  Picked_Up: {
    label: 'Picked Up',
    icon: '📦',
    color: '#712B13',
    bg: '#FAECE7',
    border: '#D85A30',
  },
  Delivered: {
    label: 'Delivered',
    icon: '✅',
    color: '#27500A',
    bg: '#EAF3DE',
    border: '#639922',
  },
};

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosIntercept = UseAxios();

  const { data = [], isLoading } = useQuery({
    queryKey: ['trackParcel', trackingId],
    queryFn: async () => {
      const res = await axiosIntercept.get(`/track-parcel/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>
  

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineDraw {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .tl-item { animation: fadeSlideIn 0.5s ease both; }
        .tl-dot  { animation: popIn 0.4s ease both; }
        .tl-line-fill { animation: lineDraw 0.6s ease both; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Tracking ID</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)', background: 'var(--color-background-secondary)', display: 'inline-block', padding: '4px 12px', borderRadius: 6 }}>
          {trackingId}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {data.map((item, index) => {
          const config = statusConfig[item.status] || statusConfig['Pending_Delivery'];
          const isLast = index === data.length - 1;
          const delay = `${index * 0.15}s`;

          return (
            <div
              key={item._id}
              className="tl-item"
              style={{ display: 'flex', gap: 16, animationDelay: delay, position: 'relative' }}
            >
              {/* Left — dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div
                  className="tl-dot"
                  style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: config.bg,
                    border: `2px solid ${config.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                    animationDelay: delay,
                    zIndex: 1,
                  }}
                >
                  {config.icon}
                </div>
                {!isLast && (
                  <div style={{ width: 2, flex: 1, minHeight: 32, background: 'var(--color-border-tertiary)', margin: '4px 0', overflow: 'hidden' }}>
                    <div
                      className="tl-line-fill"
                      style={{ width: '100%', background: config.border, animationDelay: `${index * 0.15 + 0.3}s` }}
                    />
                  </div>
                )}
              </div>

              {/* Right — content card */}
              <div style={{
                flex: 1,
                background: 'var(--color-background-primary)',
                border: `0.5px solid ${config.border}`,
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: isLast ? 0 : 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontWeight: 500, fontSize: 14, color: config.color, margin: 0 }}>
                    {config.label}
                  </p>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    background: config.bg, color: config.color,
                    padding: '2px 8px', borderRadius: 999,
                  }}>
                    {item.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                  {item.details}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '6px 0 0', fontFamily: 'var(--font-mono)' }}>
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackParcel;