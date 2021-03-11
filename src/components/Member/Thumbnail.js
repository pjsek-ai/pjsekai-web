import React from 'react';
import { Fade } from '@material-ui/core';

import ImageSVG from 'components/ImageSVG';
import Constants from 'lib/constants';

function MemberThumbnail({ member, trainedStars, trainedImage, masterRank = 0, level, ...props }) {

  const showTrainedImage = trainedImage && member.rarity > 2;
  const showTrainedStars = trainedStars && member.rarity > 2;
  const normalThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/character/member_cutout/${member.assetbundleName}/normal/thumbnail_xl.png`
  const afterTrainingThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/character/member_cutout/${member.assetbundleName}/after_training/thumbnail_xl.png`;
  // const normalThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/thumbnail/chara/${member.assetbundleName}_normal.png`;
  // const afterTrainingThumbnailUrl = `${Constants.ASSET_BASE_URL}startapp/thumbnail/chara/${member.assetbundleName}_after_training.png`;
  const frameUrl = `/images/member/cardFrame_S_${member.rarity}.png`;
  const attributeUrl = `/images/member/icon_attribute_${member.attr}.png`;
  const normalStarUrl = `/images/member/rarity_star_normal.png`;
  const afterTrainingStarUrl = `/images/member/rarity_star_afterTraining.png`;
  const masterRankUrl = `/images/member/masterRank_L_${masterRank}.png`;
  // TODO image fallback
  return (
    <svg {...props} viewBox='0 0 156 156'>
      <ImageSVG onError={(e) => {
        e.target.onerror = null;
        e.target.style.visibility = 'hidden';
      }} href={normalThumbnailUrl} x={8} y={8} width={140} height={140} />
      {member.rarity > 2 &&
        <Fade in={showTrainedImage}>
          <ImageSVG href={afterTrainingThumbnailUrl} x={8} y={8} width={140} height={140} />
        </Fade>
      }
      {level && <rect x={0} y={156 - 8 - 24} width='156' height='24' style={{ fill: '#444466' }} />}
      {level && <text x={8 + 2} y={156 - 8 - 2} style={{ fill: '#ffffff', fontSize: '24px' }}>Lv.{level}</text>}
      <ImageSVG href={frameUrl} x={0} y={0} width={156} height={156} />
      <ImageSVG href={attributeUrl} x={0} y={0} width={36} height={36} />
      {
        [...Array(member.rarity)].map((_, i) =>
          <ImageSVG key={i} href={normalStarUrl} x={8 + 2 + 23 * i} y={156 - 8 - 2 - 22 - (level ? 24 : 0)} width={23} height={22} />
        )
      }
      {member.rarity > 2 &&
        [...Array(member.rarity)].map((_, i) =>
          <Fade key={i} in={showTrainedStars}>
            <ImageSVG href={afterTrainingStarUrl} x={8 + 2 + 23 * i} y={156 - 8 - 2 - 22 - (level ? 24 : 0)} width={23} height={22} />
          </Fade>
        )
      }
      {masterRank > 0 &&
        [...Array(5)].map((_, i) =>
          <Fade key={i} in={masterRank === i + 1}>
            <ImageSVG href={`/images/member/masterRank_L_${i + 1}.png`} x={156 - 52} y={156 - 52} width={52} height={52} />
          </Fade>
        )
      }
    </svg>
  );
}

export default MemberThumbnail;