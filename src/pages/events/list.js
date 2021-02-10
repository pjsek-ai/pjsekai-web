import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from "swr";
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import EventCard from '../../components/EventCard';
import Constants from '../../constants';

function EventList() {

  const itemPerLoad = 10;

  const history = useHistory();
  const { data, mutate } = useSWR(`${Constants.API_BASE_URL}database/master/events?$limit=${itemPerLoad}&$sort[startAt]=-1`);
  return (
    <div>
      {data &&
        <InfiniteScroll
          pageStart={0}
          loadMore={() => mutate(async data => {
            const nextData = await fetch(`$${Constants.API_BASE_URL}database/master/events?$limit=${itemPerLoad}&$sort[startAt]=-1&$skip=${data.skip + data.limit}`).then(res => res.json());
            return {
              ...data,
              ...nextData,
              data: [...data.data, ...nextData.data],
            };
          }, false)}
          hasMore={data.skip + data.limit < data.total}
          loader={
            <div key={0}>
              <Typography align='center'>
                Loading...
                </Typography>
            </div>
          }
        >
          {data.data.map(entry => {
            return (
              <EventCard
                event={entry}
                onChartsClick={(entry) => {
                  history.push(`/event-charts?score-time[]=${entry.id}`);
                }}
                onRankingsClick={(entry) => {
                  history.push(`/events/${entry.id}/rankings`);
                }}
                onShopClick={(entry) => {
                  history.push(`/events/${entry.id}/shop`);
                }}
                onVliveClick={(entry) => {
                  history.push(`/virtual-lives/${entry.virtualLiveId}`);
                }}
                key={entry.id}
              />
            );
          })}
          <div style={{ height: 16 }} />
        </InfiniteScroll>
      }
    </div>
  );
}

export default EventList;