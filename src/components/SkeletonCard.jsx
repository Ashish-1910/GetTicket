import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card skeleton" style={{ width: '100%' }}>
      <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div className="skeleton-title skeleton" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="skeleton-text skeleton" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="skeleton-text-sm skeleton" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  );
};

export default SkeletonCard;
