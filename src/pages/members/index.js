import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import CardList from './list';
import SingleCard from './single';

function Cards() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <CardList />
        </Route>
        <Route path={`${path}/:cardId`}>
          <SingleCard />
        </Route>
      </Switch>
    </div>
  );
}

export default Cards;