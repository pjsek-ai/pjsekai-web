import React from 'react';
import useSWR from "swr";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';

import EventCard from '../../components/EventCard';
import NotFound from '../notFound';
import UnderConstruction from '../underConstruction';
import Contants from '../../constants';

function SingleEvent() {
  const { eventId } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { data } = useSWR(`${Contants.API_BASE_URL}database/master/events?&id=${eventId}`);
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {data &&
            (data.data[0] ?
              <EventCard
                event={data.data[0]}
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
                key={data.data[0].id}
              /> : <NotFound />
            )
          }
        </Route>
        <Route path={`${path}/rankings`}>
          <UnderConstruction />
        </Route>
        <Route path={`${path}/shop`}>
          <UnderConstruction />
        </Route>
      </Switch>

    </div>
  );
}

export default SingleEvent;