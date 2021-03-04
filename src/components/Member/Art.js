import React from 'react';
import { Fade } from '@material-ui/core';

import ImageSVG from 'components/ImageSVG';
import Constants from 'lib/constants';

function MemberArt({ member, trainedStars, trainedImage, masterRank = 0, ...props }) {

  const showTrainedImage = trainedImage && member.rarity > 2;
  const showTrainedStars = trainedStars && member.rarity > 2;
  const normalImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${member.assetbundleName}/card_normal.png`
  const afterTrainingImageUrl = `${Constants.ASSET_BASE_URL}startapp/character/member/${member.assetbundleName}/card_after_training.png`;
  const frameUrl = `/images/member/cardFrame_L_${member.rarity}.png`;
  const attributeUrl = `/images/member/icon_attribute_${member.attr}.png`;
  const normalStarUrl = `/images/member/rarity_star_normal.png`;
  const afterTrainingStarUrl = `/images/member/rarity_star_afterTraining.png`;

  return (
    <svg {...props} viewBox='0 0 2048 1152'>
      <ImageSVG href={normalImageUrl} x={0} y={-54} width={2048} height={1261} />
      {member.rarity > 2 &&
        <Fade in={showTrainedImage}>
          <ImageSVG href={afterTrainingImageUrl} x={0} y={-54} width={2048} height={1261} />
        </Fade>
      }
      <ImageSVG href={frameUrl} x={0} y={0} width={2048} height={1152} />
      <ImageSVG href={attributeUrl} x={2048 - 176 - 22} y={22} width={176} height={176} />
      {
        [...Array(member.rarity)].map((_, i) =>
          <ImageSVG key={i} href={normalStarUrl} x={36} y={1152 - 36 - 140 - 128 * i} width={144} height={140} />
        )
      }
      {member.rarity > 2 &&
        [...Array(member.rarity)].map((_, i) =>
          <Fade key={i} in={showTrainedStars}>
            <ImageSVG href={afterTrainingStarUrl} x={36} y={1152 - 36 - 140 - 128 * i} width={144} height={140} />
          </Fade>
        )
      }
      {masterRank > 0 &&
        [...Array(5)].map((_, i) =>
          <Fade key={i} in={masterRank === i + 1}>
            <ImageSVG href={`/images/member/masterRank_L_${i + 1}.png`} x={2048 - 240 - 8} y={1152 - 240 - 8} height={240} width={240} />
          </Fade>
        )
      }
    </svg>
  );
}

export default MemberArt;