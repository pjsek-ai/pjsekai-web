import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const CardList = lazy(() => import('./list'));
const SingleCard = lazy(() => import('./single'));

function Cards() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={path}>
            <CardList />
          </Route>
          <Route path={`${path}/:cardId`}>
            <SingleCard />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Cards;