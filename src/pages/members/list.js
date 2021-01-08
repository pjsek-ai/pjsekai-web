import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from "swr";
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import MemberThumbnail from '../../components/MemberThumbnail';
import Constants from '../../constants';

function MemberList() {
  const itemPerLoad = 24;

  const [showAfterTraining, setShowAfterTraining] = useState(false);
  const history = useHistory();

  const [cards, setCards] = useState({
    skip: 0,
    limit: 0,
  });
  useEffect(async () => {
    const response = await axios.get(`${Constants.API_BASE_URL}database/master/cards?&$limit=${itemPerLoad}&&$sort[seq]=-1`);
    setCards(response.data);
  }, []);

  // const { data, mutate } = useSWR(`${Constants.API_BASE_URL}database/master/cards?&$limit=${itemPerLoad}&&$sort[id]=-1`);
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={async () => {
          const response = await axios.get(`${Constants.API_BASE_URL}database/master/cards?&$limit=${itemPerLoad}&$sort[seq]=-1&$skip=${cards.skip + cards.limit}`);
          setCards(prevCards => {
            const nextCards = response.data;
            return {
              ...prevCards,
              ...nextCards,
              data: [...prevCards.data, ...nextCards.data],
            };
          })
        }}
        hasMore={cards.skip + cards.limit < cards.total}
        loader={
          <div key={0}>
            <Typography align='center'>
              Loading...
              </Typography>
          </div>
        }
      >
        <Grid container spacing={1} alignItems='center'>
          {cards.data && cards.data.map(entry => {
            return (
              <Grid key={entry.id} item xs={3} md={2} xl={1} style={{ maxWidth: 192 }}>
                <div style={{ paddingTop: '100%', position: 'relative' }}>
                  <Paper style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden', borderRadius: '5.13%' }}>
                    <ButtonBase
                      style={{ height: '100%', width: '100%' }}
                      onClick={() => {
                        history.push(`/members/${entry.id}`);
                      }}
                    >
                      <MemberThumbnail style={{ height: '100%', width: '100%' }} info={entry} afterTraining={showAfterTraining} />
                    </ButtonBase>
                  </Paper>
                </div>

              </Grid>
            );
          })}
        </Grid>
        <div style={{ height: 16 }} />
      </InfiniteScroll>
      <Fab style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }} onClick={() => setShowAfterTraining(prevShowAfterTraining => !prevShowAfterTraining)}>
        <img style={{
          height: '50%',
          width: '50%',
          objectFit: 'contain',
        }} src='/members/icon_change_gn.png' />
      </Fab>
    </div >
  );
}

export default MemberList;