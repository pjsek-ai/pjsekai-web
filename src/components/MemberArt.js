import React from 'react';
import { Fade } from '@material-ui/core';
import Constants from '../constants';

function MemberArt({ info, trainedStars, trainedImage, masterRank = 0, ...props }) {

  const showTrainedImage = trainedImage && info.rarity > 2;
  const showTrainedStars = trainedStars && info.rarity > 2;
  const normalImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${info.assetbundleName}/card_normal.png`
  const afterTrainingImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${info.assetbundleName}/card_after_training.png`;
  const frameUrl = `/images/member/cardFrame_L_${info.rarity}.png`;
  const attributeUrl = `/images/member/icon_attribute_${info.attr}.png`;
  const normalStarUrl = `/images/member/rarity_star_normal.png`;
  const afterTrainingStarUrl = `/images/member/rarity_star_afterTraining.png`;

  return (
    <svg {...props} viewBox='0 0 2048 1152'>
      <image href={normalImageUrl} x={0} y={-54} width={2048} height={1261} />
      {info.rarity > 2 &&
        <Fade in={showTrainedImage}>
          <image href={afterTrainingImageUrl} x={0} y={-54} width={2048} height={1261} />
        </Fade>
      }
      <image href={frameUrl} x={0} y={0} width={2048} height={1152} />
      <image href={attributeUrl} x={2048 - 176 - 22} y={22} width={176} height={176} />
      {
        [...Array(info.rarity)].map((_, i) =>
          <image key={i} href={normalStarUrl} x={36} y={1152 - 36 - 140 - 128 * i} width={144} height={140} />
        )
      }
      {info.rarity > 2 &&
        [...Array(info.rarity)].map((_, i) =>
          <Fade key={i} in={showTrainedStars}>
            <image href={afterTrainingStarUrl} x={36} y={1152 - 36 - 140 - 128 * i} width={144} height={140} />
          </Fade>
        )
      }
      {masterRank > 0 &&
        [...Array(5)].map((_, i) =>
          <Fade key={i} in={masterRank === i + 1}>
            <image href={`/images/member/masterRank_L_${i + 1}.png`} x={2048 - 240 - 8} y={1152 - 240 - 8} height={240} width={240} />
          </Fade>
        )
      }
    </svg>
  );
}

export default MemberArt;