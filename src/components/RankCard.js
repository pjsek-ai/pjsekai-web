import React from 'react';
import useSWR from "swr";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import {
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

import HonorMain from './HonorMain';
import HonorSub from './HonorSub';
import MemberThumbnail from './MemberThumbnail';
import Constants from '../constants';

function RankCard({ info }) {
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/cards?id=${info.userCard.cardId}`);
  const { data: honor1Data } = useSWR(info.userProfile.honorId1 ? `${Constants.API_BASE_URL}database/master/honors?id=${info.userProfile.honorId1}` : null);
  const { data: honor2Data } = useSWR(info.userProfile.honorId2 ? `${Constants.API_BASE_URL}database/master/honors?id=${info.userProfile.honorId2}` : null);
  const { data: honor3Data } = useSWR(info.userProfile.honorId3 ? `${Constants.API_BASE_URL}database/master/honors?id=${info.userProfile.honorId3}` : null);
  return (
    <Paper style={{ padding: 8 }}>
      <Grid container>
        <Grid container direction='column' justify='center' item xs={2} sm={2} md={1}>
          {info.rank <= 3 ?
            <img
              style={{ maxHeight: 100, height: '100%', width: '100%', objectFit: 'contain' }}
              src={`/images/event/rankings/icon_rank${info.rank}.png`}
            />
            :
            <Typography align='center'>
              {info.rank}
            </Typography>
          }

        </Grid>
        <Grid container direction='column' justify='center' item xs={2} sm={2} md={2}>
          {data &&
            <MemberThumbnail
              style={{ height: '100%', width: '100%', maxHeight: 125 }}
              info={data.data[0]}
              trainedStars={info.userCard.specialTrainingStatus === 'done'}
              trainedImage={info.userCard.defaultImage === 'special_training'}
              masterRank={info.userCard.masterRank}
              level={info.userCard.level}
            />
          }
        </Grid>
        <Grid container direction='column' justify='space-between' item xs={4} sm={6} md={7}>
          <div style={{ padding: 8 }}>
            <Typography >
              {info.name}
            </Typography>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <HonorMain info={honor1Data ? honor1Data.data[0] : null} level={info.userProfile.honorLevel1} />
            </Grid>
            <Grid item xs={3}>
              <HonorSub info={honor2Data ? honor2Data.data[0] : null} level={info.userProfile.honorLevel2} />
            </Grid>
            <Grid item xs={3}>
              <HonorSub info={honor3Data ? honor3Data.data[0] : null} level={info.userProfile.honorLevel3} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='column' justify='center' item xs={4} sm={2} md={2}>
          <Typography align='right'>
            {info.score} P
          </Typography>
        </Grid>
      </Grid>

    </Paper>
  );
}

export default RankCard;