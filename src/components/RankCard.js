import React from 'react';
import useSWR from "swr";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import {
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

import HonorMain from 'components/HonorMain';
import HonorSub from 'components/HonorSub';
import MemberThumbnail from 'components/Member/Thumbnail';
import Image from 'components/Image';
import Constants from 'lib/constants';

function RankCard({ rank, honor1, honor2, honor3 }) {
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/cards?id=${rank.userCard.cardId}`);
  const { data: honor1Data } = useSWR(rank.userProfile.honorId1 ? `${Constants.API_BASE_URL}database/master/honors?id=${rank.userProfile.honorId1}` : null);
  const { data: honor2Data } = useSWR(rank.userProfile.honorId2 ? `${Constants.API_BASE_URL}database/master/honors?id=${rank.userProfile.honorId2}` : null);
  const { data: honor3Data } = useSWR(rank.userProfile.honorId3 ? `${Constants.API_BASE_URL}database/master/honors?id=${rank.userProfile.honorId3}` : null);
  return (
    <Paper style={{ padding: 8 }}>
      <Grid container>
        <Grid container direction='column' justify='center' item xs={2} sm={2} md={1}>
          {rank.rank <= 3 ?
            <Image
              style={{ maxHeight: 100 }}
              src={`/images/event/rankings/icon_rank${rank.rank}.png`}
            />
            :
            <Typography align='center'>
              {rank.rank}
            </Typography>
          }

        </Grid>
        <Grid container direction='column' justify='center' item xs={2} sm={2} md={2}>
          {data &&
            <MemberThumbnail
              style={{ height: '100%', width: '100%', maxHeight: 125 }}
              member={data.data[0]}
              trainedStars={rank.userCard.specialTrainingStatus === 'done'}
              trainedImage={rank.userCard.defaultImage === 'special_training'}
              masterRank={rank.userCard.masterRank}
              level={rank.userCard.level}
            />
          }
        </Grid>
        <Grid container direction='column' justify='space-between' item xs={4} sm={6} md={7}>
          <div style={{ padding: 8 }}>
            <Typography >
              {rank.name}
            </Typography>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <HonorMain style={{ maxHeight: 60 }} honor={honor1Data ? honor1Data.data[0] : null} level={rank.userProfile.honorLevel1} />
            </Grid>
            <Grid item xs={3}>
              <HonorSub style={{ maxHeight: 60 }} honor={honor2Data ? honor2Data.data[0] : null} level={rank.userProfile.honorLevel2} />
            </Grid>
            <Grid item xs={3}>
              <HonorSub style={{ maxHeight: 60 }} honor={honor3Data ? honor3Data.data[0] : null} level={rank.userProfile.honorLevel3} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='column' justify='center' item xs={4} sm={2} md={2}>
          <Typography align='right'>
            {rank.score} P
          </Typography>
        </Grid>
      </Grid>

    </Paper>
  );
}

export default RankCard;