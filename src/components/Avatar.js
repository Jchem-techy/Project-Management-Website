import './Avatar.css';
import React from 'react';
export default function Avatar({ src }) {
  console.log(src);
  return (
    <div className='avatar'>
      <img src={src} alt='' />
    </div>
  );
}
