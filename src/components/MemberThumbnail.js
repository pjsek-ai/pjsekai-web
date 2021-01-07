import React from 'react';
import { Fade } from '@material-ui/core';
import Constants from '../constants';

function MemberThumbnail({ info, afterTraining, ...props }) {

  const showAfterTraining = afterTraining && info.rarity > 2;
  const normalThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/character/member_cutout/${info.assetbundleName}/normal/thumbnail_xl.png`
  const afterTrainingThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/character/member_cutout/${info.assetbundleName}/after_training/thumbnail_xl.png`;
  const frameUrl = `/members/cardFrame_S_${info.rarity}.png`;
  const attributeUrl = `/members/icon_attribute_${info.attr}.png`;
  const normalStarUrl = `/members/rarity_star_normal.png`;
  const afterTrainingStarUrl = `/members/rarity_star_afterTraining.png`;

  return (
    <svg {...props} viewBox='0 0 156 156'>
      <image href={normalThumbnailUrl} x={8} y={8} height={140} width={140} />
      {info.rarity > 2 &&
        <Fade in={showAfterTraining}>
          <image href={afterTrainingThumbnailUrl} x={8} y={8} height={140} width={140} />
        </Fade>
      }
      <image href={frameUrl} x={0} y={0} height={156} width={156} />
      <image href={attributeUrl} x={0} y={0} height={36} width={36} />
      {
        [...Array(info.rarity)].map((_, i) =>
          <image key={i} href={normalStarUrl} x={8 + 24 * i} y={156 - 8 - 23} height={23} width={24} />
        )
      }
      {info.rarity > 2 &&
        [...Array(info.rarity)].map((_, i) =>
          <Fade key={i} in={showAfterTraining}>
            <image href={afterTrainingStarUrl} x={8 + 24 * i} y={156 - 8 - 23} height={23} width={24} />
          </Fade>
        )
      }
    </svg>
  );
}

export default MemberThumbnail;