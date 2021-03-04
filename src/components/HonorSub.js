import React from 'react';

import ImageSVG from 'components/ImageSVG';
import Constants from 'lib/constants';

function HonorSmall({ honor, level, ...props }) {
  if (honor) {
    const rarity = Constants.HONOR_RARITIES[honor.honorRarity];
    const imageUrl = `${Constants.ASSET_BASE_URL}startapp/honor/${honor.assetbundleName}/degree_sub.png`;
    const frameUrl = `/images/honor/frame_degree_s_${rarity}.png`;
    const levelIndicatorUrl = `/images/honor/icon_degreeLv.png`;
    return (
      <svg {...props} viewBox='0 0 180 80'>
        <ImageSVG href={imageUrl} x={0} y={0} width={180} height={80} />
        <ImageSVG href={frameUrl} x={rarity === 1 ? 8 : 0} y={0} width={rarity === 1 ? 164 : 180} height={80} />
        {
          [...Array(level)].map((_, i) =>
            <ImageSVG key={i} href={levelIndicatorUrl} x={52 + 16 * i} y={80 - 16} height={16} width={16} />
          )
        }
      </svg>
    );
  }
  else {
    return (
      <svg {...props} viewBox='0 0 180 80'>
        <ImageSVG href='/images/honor/degree_empty_s.png' x={0} y={0} width={180} height={80} />
      </svg>
    );
  }
}

export default HonorSmall;