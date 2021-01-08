import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import GavelIcon from '@material-ui/icons/Gavel';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import DrawerListItem from '../components/DrawerListItem';

const Home = lazy(() => import('./home'));
const Notices = lazy(() => import('./notices'));
const Events = lazy(() => import('./events'));
const Members = lazy(() => import('./members'));
const Database = lazy(() => import('./database'));
const Assets = lazy(() => import('./assets'));
const NotFound = lazy(() => import('./notFound'));
const UnderConstruction = lazy(() => import('./underConstruction'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
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
    padding: theme.spacing(1),
  },
}));

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    icon: <HomeIcon />,
    page: <Home />,
  },
  {
    name: 'Notices',
    path: '/notices',
    exact: false,
    icon: <NotificationsIcon />,
    page: <Notices />,
  },
  {
    name: 'Members',
    path: '/members',
    exact: false,
    icon: <AssignmentIndIcon />,
    page: <Members />,
  },
  {
    name: 'Gachas',
    path: '/gachas',
    exact: false,
    icon: null,
    page: null,
  },
  {
    name: 'Songs',
    path: '/songs',
    exact: false,
    icon: null,
    page: null,
  },
  {
    name: 'Events',
    path: '/events',
    exact: false,
    icon: <DateRangeIcon />,
    page: <Events />,
  },
  {
    name: '',
    path: '/event-charts',
    exact: false,
    icon: null,
    page: null,
  },
  {
    name: 'Stories',
    path: '/stories',
    exact: false,
    icon: null,
    page: null,
  },
  {
    name: 'Virtual Lives',
    path: '/virtual-lives',
    exact: false,
    icon: null,
    page: null,
  },
  {
    divider: true,
  },
  {
    name: 'Database',
    path: '/database',
    exact: false,
    icon: <StorageIcon />,
    page: <Database />,
  },
  {
    name: 'Assets',
    path: '/assets',
    exact: false,
    icon: <PermMediaIcon />,
    page: <Assets />,
  },
  {
    name: '',
    path: '/my-profile',
    exact: false,
    icon: null,
    page: null,
  }
];

function Index({ window }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === null ? prefersDarkMode : localStorage.getItem('darkMode') === 'true');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleDrawerToggle = () => {
    setMobileOpen(prevMobileOpen => !prevMobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        {/* <LazyLoadImage
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
          src='tex_title_logo_all_01.png'
          effect='opacity'
        /> */}
      </div>
      <Divider />
      <List component='nav'>
        {
          routes.filter(route => route.divider || route.name).map((route, i) => {
            if (route.divider) {
              return <Divider key={i} />;
            }
            return (
              <DrawerListItem key={i} route={route} onClick={handleDrawerToggle} />
            );
          })
        }
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
                pjsek.ai
              </Typography>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDarkMode(prevDarkMode => !prevDarkMode)}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label='drawer'>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation='css'>
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
            <Hidden smDown implementation='css'>
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
              {
                routes.filter(route => route.path).map((route, i) => {
                  return (
                    <Route key={i} exact={route.exact} path={route.path}>
                      <Suspense fallback={<div>Loading...</div>}>
                        {route.page || <UnderConstruction />}
                      </Suspense>
                    </Route>
                  );
                })
              }
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>

          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default Index;
