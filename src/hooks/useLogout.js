import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  // this update the to be use in the authContext.js
  const { dispatch, user } = useAuthContext();
  async function logout() {
    setError(null);
    setIsPending(true);
    try {
      const { uid } = user;
      await updateDoc(doc(db, 'users', uid), {
        online: false,
      });
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      setIsPending(false);
      if (!isCancel) {
        setError(null);
      }
    } catch (error) {
      console.log(error);
      if (!isCancel) {
        setError(error.message);
        setIsPending(false);
      }
    }
  }
  useEffect(() => {
    return () => setIsCancel(true);
  });
  return { logout, error, isPending };
}
