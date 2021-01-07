import React from 'react';
import { Fade } from '@material-ui/core';
import Constants from '../constants';

function MemberArt({ info, afterTraining, ...props }) {

  const showAfterTraining = afterTraining && info.rarity > 2;
  const normalImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${info.assetbundleName}/card_normal.png`
  const afterTrainingImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${info.assetbundleName}/card_after_training.png`;
  const frameUrl = `/members/cardFrame_L_${info.rarity}.png`;
  const attributeUrl = `/members/icon_attribute_${info.attr}.png`;
  const normalStarUrl = `/members/rarity_star_normal.png`;
  const afterTrainingStarUrl = `/members/rarity_star_afterTraining.png`;

  return (
    <svg {...props} viewBox='0 0 2048 1152'>
      <image href={normalImageUrl} x={0} y={-54} width={2048} height={1261} />
      {info.rarity > 2 &&
        <Fade in={showAfterTraining}>
          <image href={afterTrainingImageUrl} x={0} y={-54} width={2048} height={1261} />
        </Fade>
      }
      <image href={frameUrl} x={0} y={0} width={2048} height={1152} />
      <image href={attributeUrl} x={2048 - 176 - 22} y={22} width={176} height={176} />
      {
        [...Array(info.rarity)].map((_, i) =>
          <image key={i} href={normalStarUrl} x={32} y={1152 - 32 - 140 - 128 * i} width={144} height={140} />
        )
      }
      {info.rarity > 2 &&
        [...Array(info.rarity)].map((_, i) =>
          <Fade key={i} in={showAfterTraining}>
            <image href={afterTrainingStarUrl} x={32} y={1152 - 32 - 140 - 128 * i} width={144} height={140} />
          </Fade>
        )
      }
    </svg>
  );
}

export default MemberArt;