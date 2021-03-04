import React from 'react';

const Image = ({ style, ...props }) => {
  return (
    <img
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.visibility = 'hidden';
      }}
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        ...style,
      }}
      {...props}
    />
  );
}

export default Image;