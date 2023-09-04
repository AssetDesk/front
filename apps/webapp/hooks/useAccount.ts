'use client';

import { useEffect, useState } from 'react';
import {
  isConnected,
  getUserInfo,
  isAllowed,
  setAllowed,
  getPublicKey,
} from '@stellar/freighter-api';

const addressLookup = async () => {
  if (await isConnected()) return (await getUserInfo()).publicKey;
  return '';
};

// returning the same object identity every time avoids unnecessary re-renders
const addressObject = {
  address: '',
  displayName: '',
};

const addressToHistoricObject = (address: string) => {
  addressObject.address = address;
  addressObject.displayName = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return addressObject;
};

/**
 * Returns an object containing `address` and `displayName` properties, with
 * the address fetched from Freighter's `getPublicKey` method in a
 * render-friendly way.
 *
 * Before the address is fetched, returns null.
 *
 * Caches the result so that the Freighter lookup only happens once, no matter
 * how many times this hook is called.
 *
 * NOTE: This does not update the return value if the user changes their
 * Freighter settings; they will need to refresh the page.
 */
export function useAccount() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | { address: string; displayName: string }>(null);

  useEffect(() => {
    if (user) return;

    void (async () => {
      try {
        const address = await addressLookup();
        if (address) setUser(addressToHistoricObject(address));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [user]);

  const login = async () => {
    if (user) return;
    const isAllow = await isAllowed();

    if (!isAllow) {
      await setAllowed();
    }
    const publicKey = await getPublicKey();
    setUser(addressToHistoricObject(publicKey));
  };

  return { user, loading, login };
}
