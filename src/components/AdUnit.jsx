import React, { useEffect } from 'react';

const AdUnit = ({ slotId, format = 'auto', style = {} }) => {
  // Check if we're in production mode
  const isProduction = import.meta.env.PROD;

  // Your AdSense Publisher ID - Replace with your actual ID from Google AdSense
  const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    if (isProduction && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isProduction]);

  // Show placeholder in development
  if (!isProduction) {
    return (
      <div className="ad-unit" style={style}>
        <div className="ad-placeholder">
          <p>Ad Space</p>
          <small>{format}</small>
          <small style={{ display: 'block', marginTop: '0.5rem', opacity: 0.6 }}>
            Slot: {slotId}
          </small>
        </div>
      </div>
    );
  }

  // Render real AdSense ad in production
  return (
    <div className="ad-unit-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
