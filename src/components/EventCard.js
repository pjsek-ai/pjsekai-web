import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import moment from 'moment';
import GavelIcon from '@material-ui/icons/Gavel';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import EventSlides from './EventSlides';
import Contants from '../constants';


function EventCard({ event, onChartsClick, onRankingsClick, onShopClick, onVliveClick }) {

  const [open, setOpen] = useState(false);
  const [audioContext] = useState(new AudioContext());
  const [playing, setPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const bufferSource = audioContext.createBufferSource();

  useEffect(() => {
    playing ? audioContext.resume() : audioContext.suspend();
  },
    [playing]
  );

  useEffect(() => {
    fetch(`${Contants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/bgm/${event.assetbundleName}_top.flac`)
      .then(resp => resp.arrayBuffer())
      .then(buf => audioContext.decodeAudioData(buf))
      .then(decoded => {
        console.log(decoded.length / 44100);
        bufferSource.buffer = decoded;
        bufferSource.loop = true;
        bufferSource.loopStart = 1.25;
        // 41.972336
        // 41.981678
        // 41.971678
        bufferSource.loopEnd = 41.97086;
        bufferSource.connect(audioContext.destination);
        audioContext.suspend();
        bufferSource.start();
        setAudioEnabled(true);
      });
  }, []);

  return (
    <div>
      <IconButton
        // style={{
        //   position: 'absolute',
        //   left: 16,
        //   top: 16,
        // }}
        disabled={!audioEnabled}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <Card style={{
        marginBottom: 16,
        backgroundImage: `url(${Contants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/screen/bg/bg.png)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

        <CardContent>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="stretch"
            spacing={2}
            wrap='nowrap'
          >
            <Grid item xs={4}>
              {event.virtualLiveId &&
                <CardActionArea onClick={() => onVliveClick(event)}>
                  <LazyLoadImage
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                    }}
                    src={`${Contants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/screen/banner/banner.png`}
                    effect='opacity'
                  />
                </CardActionArea>
              }
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item sm={4} xs={5} style={{ paddingTop: event.virtualLiveId ? '5%' : '16%', paddingBottom: '5%' }}>
              <LazyLoadImage
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
                src={`${Contants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/logo/logo/logo.png`}
                effect='opacity'
              />

            </Grid>
          </Grid>
          <Paper style={{ display: 'inline-block', paddingRight: 8, paddingLeft: 8 }}>
            <Typography variant='subtitle2'>
              {`${moment(event.startAt).format('Y/MM/DD HH:mm')} - ${moment(event.aggregateAt).format('Y/MM/DD HH:mm')}`}
            </Typography>
          </Paper>
        </CardContent>

        <CardActions>
          <Fab size="small" onClick={() => setOpen(true)} >
            <InfoIcon />
          </Fab>
          <div style={{ flexGrow: 1 }} />
          <Button
            size="small"
            variant="contained"
            onClick={() => onChartsClick(event)}
            startIcon={<GavelIcon />}
          >
            Charts
        </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onRankingsClick(event)}
            startIcon={<GavelIcon />}
          >
            Rankings
        </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onShopClick(event)}
            startIcon={<GavelIcon />}
          >
            Shop
        </Button>
        </CardActions>
      </Card>
      <EventSlides event={event} open={open} onClose={() => setOpen(false)} />
    </div >

  );
}

export default EventCard;