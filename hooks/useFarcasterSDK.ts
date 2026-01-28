'use client';

import { useEffect, useState } from 'react';

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface FarcasterSDK {
  openUrl: (url: string) => Promise<void>;
  close: () => Promise<void>;
}

export function useFarcasterSDK() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [sdk, setSdk] = useState<FarcasterSDK | null>(null);

  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(async (module) => {
        const context = await module.sdk.context;
        setUser(context.user);
        setSdk({
          openUrl: module.sdk.actions.openUrl,
          close: module.sdk.actions.close,
        });
      })
      .catch(() => {
        console.warn('Running outside Farcaster environment');
      });
  }, []);

  const openUrl = async (url: string) => {
    if (sdk) {
      try {
        await sdk.openUrl(url);
      } catch {
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const close = async () => {
    if (sdk) {
      try {
        await sdk.close();
      } catch {
        window.close();
      }
    }
  };

  return { user, openUrl, close };
}
