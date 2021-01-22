import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const GachaList = lazy(() => import('./list'));
const GachaPage = lazy(() => import('./single'));

function Cards() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={path}>
            <GachaList />
          </Route>
          <Route path={`${path}/:gachaId`}>
            <GachaPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Cards;