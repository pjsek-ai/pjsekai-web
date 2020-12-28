import React from "react";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useSWR from "swr";
import moment from 'moment';

import BannerCarousel from '../../components/BannerCarousel';
import Contants from '../../constants';

function Home() {

  const { data: systemInfo } = useSWR(`${Contants.API_BASE_URL}system-info`);

  return <div>
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
  </div>;

}

export default Home;