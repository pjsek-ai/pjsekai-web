import React, { useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import useSWR from "swr";
import moment from 'moment';

import BannerCarousel from 'components/BannerCarousel';
import Constants from 'lib/constants';

function Home() {

  const [now, setNow] = useState(Date.now());

  const { data: systemInfo } = useSWR(`${Constants.API_BASE_URL}system-info`);
  const { data: patrons } = useSWR(`${Constants.API_BASE_URL}patrons?$limit=-1`);
  const { data: banners } = useSWR(`${Constants.API_BASE_URL}database/user/userHomeBanners?startAt[$lte]=${now}&endAt[$gte]=${now}&$sort[seq]=1`);

  const masters = patrons ? patrons.filter(patron => patron.Tier === "Master") : [];
  const experts = patrons ? patrons.filter(patron => patron.Tier === "Expert") : [];
  const hards = patrons ? patrons.filter(patron => patron.Tier === "Hard") : [];

  return <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <BannerCarousel banners={banners} />
      {systemInfo ?
        <div>
          <Typography>
            Latest versions since {moment(systemInfo.data[0].datetime).fromNow()} ({moment(systemInfo.data[0].datetime).format('lll')})
          </Typography>
          <List>
            <ListItem>
              <Typography>
                App version: {systemInfo.data[0].appVersion}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Multiplayer version: {systemInfo.data[0].multiPlayVersion}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Data version: {systemInfo.data[0].dataVersion}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Asset version: {systemInfo.data[0].assetVersion}
              </Typography>
            </ListItem>
          </List>
        </div> :
        <div>
          <Typography>
            Loading...
          </Typography>
        </div>
      }
    </Grid>
    {
      patrons && patrons.length > 0 &&
      <Grid item xs={12} md={6}>
        <Typography>
          Special thanks to our patrons
        </Typography>
        {masters.length > 0 &&
          <div>
            <Typography>
              Master tier:
            </Typography>
            <List>
              {masters.map(patron => {
                return <ListItem>
                  <Typography>
                    {patron.Name}
                  </Typography>
                </ListItem>
              })}
            </List>
          </div>
        }
        {experts.length > 0 &&
          <div>
            <Typography>
              Expert tier:
            </Typography>
            <List>
              {experts.map(patron => {
                return <ListItem>
                  <Typography>
                    {patron.Name}
                  </Typography>
                </ListItem>
              })}
            </List>
          </div>
        }
        {hards.length > 0 &&
          <div>
            <Typography>
              Hard tier:
            </Typography>
            <List>
              {hards.map(patron => {
                return <ListItem>
                  <Typography>
                    {patron.Name}
                  </Typography>
                </ListItem>
              })}
            </List>
          </div>
        }
      </Grid>
    }
  </Grid>
}

export default Home;