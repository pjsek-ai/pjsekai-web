import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const SongList = lazy(() => import('./list'));
const SongPage = lazy(() => import('./single'));
const UnderConstruction = lazy(() => import('pages/underConstruction'));

function Cards() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={path}>
            <SongList />
          </Route>
          <Route path={`${path}/:musicId`}>
            <UnderConstruction />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Cards;