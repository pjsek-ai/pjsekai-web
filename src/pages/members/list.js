import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from "swr";
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Fab,
  Typography,
} from '@material-ui/core';

import Image from 'components/Image';
import MemberCardSmall from 'components/Member/Cards/Small';
import Constants from 'lib/constants';

function MemberList() {
  const itemPerLoad = 36;

  const [showAfterTraining, setShowAfterTraining] = useState(false);
  const history = useHistory();

  const [cards, setCards] = useState({
    skip: 0,
    limit: 0,
    data: [],
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = async () => {
    if (!loadingMore) {
      await setLoadingMore(true);
      const response = await axios.get(`${Constants.API_BASE_URL}database/master/cards?$limit=${itemPerLoad}&$sort[seq]=-1&$skip=${cards.skip + cards.limit}`);
      await setCards(prevCards => {
        const nextCards = response.data;
        return {
          ...prevCards,
          ...nextCards,
          data: [...prevCards.data, ...nextCards.data],
        };
      });
      await setLoadingMore(false);
    }

  }

  useEffect(() => {
    loadMore();
  }, []);

  // const { data, mutate } = useSWR(`${Constants.API_BASE_URL}database/master/cards?$limit=${itemPerLoad}&&$sort[id]=-1`);
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
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
                <MemberCardSmall
                  member={entry}
                  showAfterTraining={showAfterTraining}
                  onClick={() => {
                    history.push(`/members/${entry.id}`);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        <div style={{ height: 16 }} />
      </InfiniteScroll>
      <Fab
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setShowAfterTraining(prevShowAfterTraining => !prevShowAfterTraining)}
      >
        <Image
          style={{
            height: '50%',
            width: '50%',
          }}
          src='/images/member/icon_change_gn.png'
        />
      </Fab>
    </div >
  );
}

export default MemberList;