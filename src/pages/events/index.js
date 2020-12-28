import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import EventList from './list';
import SingleEvent from './single';

function Events() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <EventList />
        </Route>
        <Route path={`${path}/:eventId`}>
          <SingleEvent />
        </Route>
      </Switch>
    </div>
  );
}

export default Events;