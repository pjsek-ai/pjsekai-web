import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import useSWR from "swr";
import moment from 'moment';

import BannerCarousel from '../../components/BannerCarousel';
import Constants from '../../constants';

function Home() {

  const { data: systemInfo } = useSWR(`${Constants.API_BASE_URL}system-info`);

  return <Container>
    <BannerCarousel />
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
  </Container>;

}

export default Home;