import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const EventList = lazy(() => import('./list'));
const SingleEvent = lazy(() => import('./single'));

function Events() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={path}>
            <EventList />
          </Route>
          <Route path={`${path}/:eventId`}>
            <SingleEvent />
          </Route>
        </Switch>
      </Suspense>

    </div>
  );
}

export default Events;