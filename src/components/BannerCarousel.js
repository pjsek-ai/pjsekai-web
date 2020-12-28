import React, { useState } from 'react';
import useSWR from 'swr';
import Carousel from 'nuka-carousel';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';

import Contants from '../constants';

function BannerCarousel() {
  const [now, setNow] = useState(Date.now());
  const [slideIndex, setSlideIndex] = useState(0);

  const { data: banners } = useSWR(`${Contants.API_BASE_URL}database/user/userHomeBanners?startAt[$lte]=${now}&endAt[$gte]=${now}&$sort[seq]=1`);

  return (
    <div style={{ maxWidth: 488 }}>
      <Carousel
        autoplay={true}
        wrapAround={true}
        withoutControls={true}
        slideIndex={slideIndex}
        afterSlide={i => setSlideIndex(i)}
      >
        {banners && banners.data.map(banner => {
          const url = `${Contants.ASSET_BASE_URL}startapp/home/banner/${banner.assetbundleName}/${banner.assetbundleName}.png`;
          return (
            <div key={banner.id}>
              <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={url} />
            </div>
          );
        })}
      </Carousel>
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
        >
          <Grid item />
          {banners && banners.data.map((banner, i) => {
            return (
              <Grid key={banner.id} item xs={1}>
                <ButtonBase style={{ borderRadius: '50%' }} onClick={() => {
                  setSlideIndex(i);
                }}>
                  <Paper style={{ margin: 0, height: 16, width: 16, borderRadius: '50%', backgroundColor: '#ffffff' }}>
                    <Grid
                      style={{ height: '100%' }}
                      container
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Paper style={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: i === slideIndex ? '#FF55AA' : '#444466' }} />
                      </Grid>
                    </Grid>
                  </Paper>

                </ButtonBase>
              </Grid>
            );
          })}

        </Grid>
      </div>

    </div>
  );
}

export default BannerCarousel