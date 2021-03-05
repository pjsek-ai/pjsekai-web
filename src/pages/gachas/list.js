import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
} from '@material-ui/core';

import GachaCardSmall from 'components/Gacha/Cards/Small';
import Constants from 'lib/constants';

function GachaList() {
  const itemPerLoad = 24;

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
            return (
              <Grid key={entry.id} item xs={6} md={4} xl={2}>
                <GachaCardSmall
                  gacha={entry}
                  onClick={() => {
                    history.push(`/gachas/${entry.id}`);
                  }}
                />

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