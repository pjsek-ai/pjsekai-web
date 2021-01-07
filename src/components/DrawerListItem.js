import React from "react";
import {
  Link,
  useRouteMatch,
} from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core';
import GavelIcon from '@material-ui/icons/Gavel';

function DrawerListItem({ route, onClick }) {
  const match = useRouteMatch(route);
  const md = useMediaQuery(theme => theme.breakpoints.up('md'));
  return (
    <ListItem selected={!!match} button component={Link} to={route.path || '/'} onClick={md ? null : onClick}>
      <ListItemIcon>{route.icon || <GavelIcon />}</ListItemIcon>
      <ListItemText primary={route.name} />
    </ListItem>
  );
}

export default DrawerListItem;