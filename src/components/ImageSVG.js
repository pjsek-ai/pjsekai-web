import React from 'react';

const ImageSVG = ({ ...props }) => {
  return (
    <image
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.visibility = 'hidden';
      }}
      {...props}
    />
  );
}

export default ImageSVG;