import React, { useEffect } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import {
  Container,
  Typography,
} from '@material-ui/core';

import RankCard from '../../components/RankCard';
import Constants from '../../constants';

function Rankings({ event }) {
  const { data, mutate } = useSWR(`${Constants.API_BASE_URL}event-rankings?eventId=${event.id}`);
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return <Container disableGutters>
    <Typography gutterBottom>
      Last updated: {data ? `${moment(data.data[0].endDatetime).format('ll LTS')}` : '--'}
    </Typography>
    {data && data.data[0].rankings.map(rank => {
      return (
        <div key={rank.rank} style={{ paddingBottom: 8 }}>

          <RankCard info={rank} />

        </div>
      );
    })}
  </Container>;

}

export default Rankings;