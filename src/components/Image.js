import React from 'react';

const Image = ({ style, ...props }) => {
  return (
    <img
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.visibility = 'hidden';
      }}
      style={{
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
        ...style,
      }}
      {...props}
    />
  );
}

export default Image;