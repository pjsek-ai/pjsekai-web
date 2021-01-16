import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import moment from 'moment';

import Constants from '../constants';

const icons = {
  bug: "icon_failure.png",
  campaign: "icon_campaign.png",
  event: "icon_event.png",
  gacha: "icon_gacha.png",
  information: "icon_notice.png",
  music: "icon_song.png",
  update: "icon_update.png",
};

function NoticeCard({ notice, onNoticeClick }) {

  return (
    <Card style={{ margin: 16 }}>
      <CardActionArea onClick={() => onNoticeClick(notice)}>
        <CardContent>
          <Grid
            style={{ paddingLeft: 16, paddingRight: 16 }}
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={2}
          >
            {notice.bannerAssetbundleName &&
              <Grid item sm={3} xs={12}>
                <LazyLoadImage
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                  src={`${Constants.OFFICIAL_NOTICE_BASE_URL}images/information/${notice.bannerAssetbundleName}.png`}
                  effect='opacity'
                />
              </Grid>
            }
            <Grid item sm={notice.bannerAssetbundleName ? 9 : 12} xs={12} container
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography variant="h6">
                  {notice.title}
                </Typography>
              </Grid>
              <Grid item container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography align='right' variant="subtitle2">
                    {moment(notice.startAt).format('Y/MM/DD HH:mm')}
                  </Typography>
                </Grid>
                <Grid item sm={notice.bannerAssetbundleName ? 4 : 3} xs={4}>
                  <LazyLoadImage
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                    }}
                    src={`/images/notice/${icons[notice.informationTag]}`}
                    effect='opacity'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NoticeCard;