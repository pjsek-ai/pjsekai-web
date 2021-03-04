import React, { useState } from 'react';
import Carousel from 'nuka-carousel';
import {
  Grid,
  Paper,
  ButtonBase,
} from '@material-ui/core';

import Image from 'components/Image';
import Constants from 'lib/constants';

function BannerCarousel({ banners }) {
  const [slideIndex, setSlideIndex] = useState(0);
  console.log(banners);
  return (
    <div style={{ maxWidth: 488 }}>
      <Carousel
        autoplay={true}
        wrapAround={true}
        withoutControls={true}
        slideIndex={slideIndex}
        afterSlide={i => setSlideIndex(i)}
      >
        {banners && banners.data.map((banner, i) => {
          const url = `${Constants.ASSET_BASE_URL}startapp/home/banner/${banner.assetbundleName}/${banner.assetbundleName}.png`;
          return (
            <div key={i}>
              <Image src={url} />
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
              <Grid key={i} item xs={1}>
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