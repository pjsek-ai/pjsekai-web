import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
} from '@material-ui/core';

import EventCardSmall from 'components/Event/Cards/Small';
import Constants from 'lib/constants';

function EventList() {
  const itemPerLoad = 12;

  const history = useHistory();

  const [events, setEvents] = useState({
    skip: 0,
    limit: 0,
    data: [],
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = async () => {
    if (!loadingMore) {
      await setLoadingMore(true);
      const response = await axios.get(`${Constants.API_BASE_URL}database/master/events?$limit=${itemPerLoad}&$sort[startAt]=-1&$skip=${events.skip + events.limit}`);
      await setEvents(prevEvents => {
        const nextEvents = response.data;
        return {
          ...prevEvents,
          ...nextEvents,
          data: [...prevEvents.data, ...nextEvents.data],
        };
      });
      await setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={events.skip + events.limit < events.total}
        loader={
          <div key={0}>
            <Typography align='center'>
              Loading...
              </Typography>
          </div>
        }
      >
        <Grid container spacing={1} alignItems='center'>
          {events.data && events.data.map(entry => {
            return (
              <Grid key={entry.id} item xs={6} md={4} xl={2}>
                <EventCardSmall
                  event={entry}
                  onClick={() => {
                    history.push(`/events/${entry.id}`);
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

export default EventList;