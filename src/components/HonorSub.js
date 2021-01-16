import React from 'react';

import Constants from '../constants';

function HonorSmall({ info, level, ...props }) {
  if (info) {
    const rarity = Constants.HONOR_RARITIES[info.honorRarity];
    const imageUrl = `${Constants.ASSET_BASE_URL}startapp/honor/${info.assetbundleName}/degree_sub.png`;
    const frameUrl = `/images/honor/frame_degree_s_${rarity}.png`;
    const levelIndicatorUrl = `/images/honor/icon_degreeLv.png`;
    return (
      <svg {...props} viewBox='0 0 180 80'>
        <image href={imageUrl} x={0} y={0} width={180} height={80} />
        <image href={frameUrl} x={rarity === 1 ? 8 : 0} y={0} width={rarity === 1 ? 164 : 180} height={80} />
        {
          [...Array(level)].map((_, i) =>
            <image key={i} href={levelIndicatorUrl} x={52 + 16 * i} y={80 - 16} height={16} width={16} />
          )
        }
      </svg>
    );
  }
  else {
    return (
      <svg {...props} viewBox='0 0 180 80'>
        <image href='/images/honor/degree_empty_s.png' x={0} y={0} width={180} height={80} />
      </svg>
    );
  }
}

export default HonorSmall;