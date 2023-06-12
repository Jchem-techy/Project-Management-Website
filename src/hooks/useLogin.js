import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default function useLogin(email, password) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  // this update the to be use in the authContext.js
  const { dispatch } = useAuthContext();
  // const { uid } = user;
  async function login(email, password) {
    setError(null);
    setIsPending(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      await updateDoc(doc(db, 'users', user.uid), { online: true });
      await dispatch({ type: 'LOGIN', payload: user });
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
  return { login, error, isPending };
}
