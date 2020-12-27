import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DateRangeIcon from '@material-ui/icons/DateRange';

import Home from "./home";
import Notices from "./notices";
import Assets from "./assets";
import NotFound from "./notFound";
import UnderConstruction from "./underConstruction";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List component='nav'>
        <ListItem button component={Link} to='/'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to='/notices'>
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          <ListItemText primary='Notices' />
        </ListItem>
        <ListItem button component={Link} to='/events'>
          <ListItemIcon><DateRangeIcon /></ListItemIcon>
          <ListItemText primary='Events' />
        </ListItem>
        <ListItem button component={Link} to='/songs'>
          <ListItemIcon><MusicNoteIcon /></ListItemIcon>
          <ListItemText primary='Songs' />
        </ListItem>
        <ListItem button component={Link} to='/cards'>
          <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
          <ListItemText primary='Cards' />
        </ListItem>
        <ListItem button component={Link} to='/assets'>
          <ListItemIcon><StorageIcon /></ListItemIcon>
          <ListItemText primary='Assets' />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              pjsek.ai
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label='drawer'>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/notices'>
              <UnderConstruction />
            </Route>
            <Route path='/events'>
              <UnderConstruction />
            </Route>
            <Route path='/songs'>
              <UnderConstruction />
            </Route>
            <Route path='/cards'>
              <UnderConstruction />
            </Route>
            <Route path='/assets'>
              <Assets />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>

        </main>
      </div>
    </Router>
  );
}

export default App;
