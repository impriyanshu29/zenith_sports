// TokenRefresher.js

import React, { useEffect, useState } from 'react';

const TokenRefresher = () => {
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const refreshTokens = async () => {
      try {
        const response = await fetch('/api/auth/refresh',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          },
          
        });

        if (response.ok) {
          const { accessToken, newRefreshToken } = await response.json();
          setRefreshToken(newRefreshToken);

        
        } else {
          console.error('Failed to refresh token:', response.error);
        }
      } catch (error) {
        console.error('Error refreshing token:', error.message);
      }
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);

        if (!response.ok) {
          await refreshTokens();
          return originalFetch(...args);
        }

        return response;
      } catch (error) {
        console.error('Error during fetch:', error.message);
        await refreshTokens();
        return originalFetch(...args);
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [refreshToken]);

  return null;
};

export default TokenRefresher;
