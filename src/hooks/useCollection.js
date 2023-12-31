import React, { useEffect } from 'react';
import { useState } from 'react';
import { colRef } from '../firebase/config';
import { docs, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';

export default function useCollection(collection) {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(colRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let results = [];
      querySnapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      // update state
      console.log(results);
      setDocuments(results);
      setError(null);
    });

    return () => unsub();
  }, [collection]);

  return { documents, error };
}
