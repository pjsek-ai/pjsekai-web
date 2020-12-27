import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import useSWR from "swr";
import Slider from "react-slick";
import moment from 'moment';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [now, setNow] = useState(Date.now());

  const { data: systemInfo } = useSWR(`https://api.pjsek.ai/system-info`);
  const { data: banners } = useSWR(`https://api.pjsek.ai/database/user/userHomeBanners?startAt[$lte]=${now}&endAt[$gte]=${now}&$sort[seq]=1`);

  return <div>
    <div style={{ width: 400, paddingBottom: 32 }}>
      <Slider
        autoplay={true}
        adaptiveHeight={true}
        dots={true}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {banners && banners.data.map(banner => {
          const url = `https://assets.pjsek.ai/file/pjsekai-assets/startapp/home/banner/${banner.assetbundleName}/${banner.assetbundleName}.png`;
          return (
            <div key={banner.id}>
              <img style={{ width: '100%', height: '100%', objectFit: 'contain', }} src={url} />
            </div>

          );
        })}
      </Slider>
    </div>
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
      <div>loading...</div>}
  </div>;

}

export default Home;