//  react imports
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// hooks imports
import { useAuthContext } from './useAuthContext.js';
// firebase auth imports
import { auth, storageRef, storage, db } from '../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    // await user.user.updateProfile({displayName})
    setError(null);
    setIsPending(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);
      if (!userCredentials) {
        throw new Error('Could not complete signup');
      }

      //upload user thumbnail
      const uplodadPath = `thumbnail/${user.uid}/${thumbnail.name}`;
      // file upload path
      const storageRef = ref(storage, uplodadPath);
      // upload byte resumable helps to pause and resume
      const img = await uploadBytesResumable(storageRef, thumbnail);
      const imgUrl = await getDownloadURL(ref(storage, uplodadPath));
      console.log(imgUrl);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: imgUrl,
      });

      //create a user document
      await setDoc(doc(db, 'users', user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatching the login event
      dispatch({ type: 'LOGIN', payload: user });
      setIsPending(false);
      if (!isCancel) {
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancel) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancel(true);
  });

  return { error, isPending, signup };
}
