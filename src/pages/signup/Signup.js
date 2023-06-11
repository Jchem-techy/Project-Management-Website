import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

// styles
import './Signup.css';

import React from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();
  function handleSubmit(e) {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  }

  function handleFileChange(e) {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);
    if (!selected) {
      setThumbnailError('please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('selected files must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('image file size must be less than 100kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log(`thumbnail updated`);
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>signup</h2>
      <label>
        <span>email:</span>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type='text'
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input type='file' required onChange={handleFileChange} />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && (
        <button type='submit' className='btn'>
          Sign up
        </button>
      )}
      {isPending && (
        <button type='submit' className='btn' disabled>
          Loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
