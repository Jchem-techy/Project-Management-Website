import { useState } from 'react';

// styles
import './Signup.css';

import React from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  return (
    <form className='auth-form'>
      <h2>signup</h2>
      <label htmlFor=''>
        <span>email:</span>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor=''>
        <span>password:</span>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor=''>
        <span>display name:</span>
        <input
          type='text'
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label htmlFor=''>
        <span>profile thumbnail:</span>
        <input
          type='file'
          required
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </label>
      <button type='submit' className='btn'>
        sign up
      </button>
    </form>
  );
}
