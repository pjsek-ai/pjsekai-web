import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// import GachaCard from '../../components/GachaCard';
import Constants from '../../constants';

function GachaList() {
  const itemPerLoad = 12;

  const history = useHistory();

  const [gachas, setGachas] = useState({
    skip: 0,
    limit: 0,
  });
  useEffect(async () => {
    const response = await axios.get(`${Constants.API_BASE_URL}database/master/gachas?$limit=${itemPerLoad}&&$sort[startAt]=-1`);
    setGachas(response.data);
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={async () => {
          const response = await axios.get(`${Constants.API_BASE_URL}database/master/gachas?$limit=${itemPerLoad}&$sort[startAt]=-1&$skip=${gachas.skip + gachas.limit}`);
          setGachas(prevGachas => {
            const nextGachas = response.data;
            return {
              ...prevGachas,
              ...nextGachas,
              data: [...prevGachas.data, ...nextGachas.data],
            };
          })
        }}
        hasMore={gachas.skip + gachas.limit < gachas.total}
        loader={
          <div key={0}>
            <Typography align='center'>
              Loading...
              </Typography>
          </div>
        }
      >
        <Grid container spacing={1} alignItems='center'>
          {gachas.data && gachas.data.map(entry => {
            const url = `${Constants.ASSET_BASE_URL}ondemand/gacha/${entry.assetbundleName}/logo/logo.png`;
            return (
              <Grid key={entry.id} item xs={6} md={4} xl={2}>
                <div style={{ paddingTop: '50%', position: 'relative' }}>
                  <Paper style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden', borderRadius: '5.13%' }}>
                    <ButtonBase
                      style={{ height: '100%', width: '100%' }}
                      onClick={() => {
                        history.push(`/gachas/${entry.id}`);
                      }}
                    >
                      <LazyLoadImage
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                        }}
                        src={url}
                        effect='opacity'
                      />
                    </ButtonBase>
                  </Paper>
                </div>

              </Grid>
            );
          })}
        </Grid>
        <div style={{ height: 16 }} />
      </InfiniteScroll>
    </div >
  );
}

export default GachaList;