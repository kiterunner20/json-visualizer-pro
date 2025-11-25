import React from 'react';

const AdUnit = ({ slotId, format = 'auto', style = {} }) => {
  // In a real app, this would integrate with Google AdSense or another provider
  // For now, we show a placeholder in development mode
  const isDev = true; // Toggle this for production

  if (isDev) {
    return (
      <div className="ad-unit" style={style}>
        <div className="ad-placeholder">
          <p>Ad Space</p>
          <small>{format}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-unit-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
