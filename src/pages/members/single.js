import React, { useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

import {
  Paper,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Fab,
} from '@material-ui/core';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Image from 'components/Image';
import MemberArt from 'components/Member/Art';
import UnderConstruction from 'pages/underConstruction';
import Constants from 'lib/constants';
import { Slider } from '@material-ui/core';

function SingleMember() {
  const { cardId } = useParams();
  const [showAfterTraining, setShowAfterTraining] = useState(false);
  const [level, setLevel] = useState(1);
  const [skillLevel, setSkillLevel] = useState(1);
  const [story1Activation, setStory1Activation] = useState(false);
  const [story2Activation, setStory2Activation] = useState(false);
  const [masterRank, setMasterRank] = useState(0);
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/cards?id=${cardId}`);
  const { data: characterData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/gameCharacters?id=${data.data[0].characterId}` : null);
  const { data: rarityData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/cardRarities?rarity=${data.data[0].rarity}` : null);
  const supportUnitImageUrl = `/images/member/logo_${data && data.data[0].supportUnit}.png`;
  const unitImageUrl = `/images/member/logo_${characterData && characterData.data[0].unit}.png`;

  // console.log(rarityData);

  const { power: performance } = (data && data.data[0].cardParameters.find(param => param.cardLevel === level && param.cardParameterType === 'param1')) || { power: 0 };
  const { power: technique } = (data && data.data[0].cardParameters.find(param => param.cardLevel === level && param.cardParameterType === 'param2')) || { power: 0 };
  const { power: stamina } = (data && data.data[0].cardParameters.find(param => param.cardLevel === level && param.cardParameterType === 'param3')) || { power: 0 };

  return <div>
    <Paper>
      <Grid style={{ padding: 8 }} container>
        <Grid item xs={12} lg={7}>
          <Grid container>
            <Grid item xs={3}>
              <Image
                src={unitImageUrl}
              />
            </Grid>
            <Grid item xs>
              <Typography variant='h5'>
                {data ? data.data[0].prefix : 'Loading...'}
              </Typography>
              <Typography variant='h5'>
                {characterData ? `${characterData.data[0].firstName}${characterData.data[0].givenName}` : 'Loading...'}
              </Typography>
            </Grid>
            {data && data.data[0].supportUnit !== 'none' &&
              <Grid item xs={3}>
                <LazyLoadImage
                  src={supportUnitImageUrl}
                />
              </Grid>
            }
          </Grid>
          {data && rarityData && <MemberArt member={data.data[0]} trainedStars={level > rarityData.data[0].maxLevel} trainedImage={showAfterTraining} />}
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <Fab
                size='small'
                onClick={() => setShowAfterTraining(!showAfterTraining)}
              >
                <Image
                  style={{
                    height: '50%',
                    width: '50%',
                  }}
                  src='/images/member/icon_change_gn.png'
                />
              </Fab>
            </Grid>
            {/* <Grid item xs={5}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Side Story (Part 1)"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={5}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Side Story (Part 2)"
                />
              </FormGroup>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>

          <Paper style={{ margin: 8, padding: 8 }} >
            <Grid container>
              <Grid item xs={3}>
                <Typography>
                  Power
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  {performance + technique + stamina}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography>
                  Performance {performance}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  Technique {technique}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  Stamina{stamina}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ margin: 8, padding: 8 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography>
                  Level
              </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={7}>
                {rarityData &&
                  <Slider
                    valueLabelDisplay='auto'
                    value={level}
                    min={1}
                    max={rarityData.data[0].trainingMaxLevel || rarityData.data[0].maxLevel}
                    onChange={(event, newValue) => setLevel(newValue)}
                  />
                }
              </Grid>
              <Grid item xs={5}>

              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ margin: 8, padding: 8 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography>
                  Skill
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  {data ? data.data[0].cardSkillName : 'Loading...'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={7}>

              </Grid>
              <Grid item xs={5}>

              </Grid>
              <Typography>

              </Typography>
            </Grid>
          </Paper>
          <UnderConstruction />
        </Grid>
      </Grid>
    </Paper>
  </div>;
}

export default SingleMember;