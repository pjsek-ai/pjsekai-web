import React from 'react';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
import ReactPlayer from 'react-player';

import Image from 'components/Image';
import Constants from 'lib/constants';

function GachaCardLarge({ gacha }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingTop: '60%',
    }}>
      <Paper style={{
        backgroundImage: `url(${Constants.ASSET_BASE_URL}ondemand/gacha/${gacha.assetbundleName}/screen/texture/bg_gacha${gacha.id}.png)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>

        <div style={{
          position: 'absolute',
          bottom: '45%',
          right: 0,
          width: '45%',
          maskImage: 'linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1))',
          WebkitMaskImage: '-webkit-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1))',
        }}>
          <ReactPlayer
            url={`${Constants.ASSET_BASE_URL}ondemand/movie/gacha/${gacha.assetbundleName}_mv1/gacha_mv_1.mp4`}
            height='100%'
            width='100%'
            playing
            loop
            muted
            playsinline

          />
        </div>

        <div style={{ position: 'absolute', bottom: -6, left: -8 }}>
          <Image
            src={`${Constants.ASSET_BASE_URL}ondemand/gacha/${gacha.assetbundleName}/screen/texture/img_gacha${gacha.id}.png`}
          />
        </div>

        <div style={{ position: 'absolute', bottom: 8, left: 8, width: '30%', height: '40%' }}>
          <Image
            src={`${Constants.ASSET_BASE_URL}ondemand/gacha/${gacha.assetbundleName}/logo/logo.png`}
          />
        </div>

        <div style={{ position: 'absolute', bottom: 8, left: 8, width: '100%', height: '10%' }}>
          <Paper style={{ position: 'relative', display: 'inline-block', paddingRight: 8, paddingLeft: 8 }}>
            <Typography variant='subtitle2' style={{ fontSize: 'min(3vw,24px)' }}>
              {`${moment(gacha.startAt).format('Y/MM/DD HH:mm')} - ${moment(gacha.endAt).format('Y/MM/DD HH:mm')}`}
            </Typography>
          </Paper>
        </div>

        {/* <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={5} sm={4} lg={3} style={{ zIndex: 1 }}>

          </Grid>
        </Grid>

        <Button
          size="small"
          variant="contained"
          startIcon={<GavelIcon />}
        >
          Charts
          </Button>
        <Button
          size="small"
          variant="contained"
        >
          Rankings
          </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<GavelIcon />}
        >
          Shop
          </Button> */}
      </Paper>
    </div >

  );
}

export default GachaCardLarge;