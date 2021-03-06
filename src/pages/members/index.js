import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const MemberList = lazy(() => import('./list'));
const SingleMember = lazy(() => import('./single'));

function Members() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={path}>
            <MemberList />
          </Route>
          <Route path={`${path}/:cardId`}>
            <SingleMember />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Members;