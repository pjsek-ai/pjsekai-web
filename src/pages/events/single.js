import React, { Suspense, lazy } from 'react';
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
import Constants from '../../constants';

const Rankings = lazy(() => import('./rankings'));

function SingleEvent() {
  const { eventId } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/events?id=${eventId}`);
  return (
    <div><Suspense fallback={<div>Loading...</div>}>
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

          {data && data.data[0] && <Rankings event={data.data[0]} />}

        </Route>
        <Route path={`${path}/shop`}>
          <UnderConstruction />
        </Route>
      </Switch>
    </Suspense>
    </div>
  );
}

export default SingleEvent;