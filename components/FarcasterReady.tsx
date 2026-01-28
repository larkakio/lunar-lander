'use client';

import { useEffect } from 'react';

export function FarcasterReady() {
  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => {
        sdk.actions.ready().catch(() => {
          console.warn('Farcaster SDK ready() failed');
        });
      })
      .catch(() => {
        console.warn('Farcaster SDK not available');
      });
  }, []);

  return null;
}
