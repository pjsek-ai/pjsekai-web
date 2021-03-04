import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Fab,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import GavelIcon from '@material-ui/icons/Gavel';

import moment from 'moment';

import Image from 'components/Image';
import EventSlides from 'components/Event/Slides';
import Constants from 'lib/constants';


function EventCardLarge({ event, onChartsClick, onRankingsClick, onShopClick, onVliveClick }) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card style={{
        marginBottom: 16,
        backgroundImage: `url(${Constants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/screen/bg/bg.png)`,
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
                  <Image
                    src={`${Constants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/screen/banner/banner.png`}
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
              <Image
                src={`${Constants.ASSET_BASE_URL}ondemand/event/${event.assetbundleName}/logo/logo/logo.png`}
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

export default EventCardLarge;