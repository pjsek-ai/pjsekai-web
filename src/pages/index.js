import React, { useState, useMemo } from "react";
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
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

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

function Index({ window }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

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
          {/* <ListItemIcon><DateRangeIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Events' />
        </ListItem>
        <ListItem button component={Link} to='/songs'>
          {/* <ListItemIcon><MusicNoteIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Songs' />
        </ListItem>
        <ListItem button component={Link} to='/cards'>
          {/* <ListItemIcon><AssignmentIndIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Cards' />
        </ListItem>
        <ListItem button component={Link} to='/gachas'>
          {/* <ListItemIcon><LocalActivityIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Gachas' />
        </ListItem>
        <ListItem button component={Link} to='/stories'>
          {/* <ListItemIcon><ChromeReaderModeIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Stories' />
        </ListItem>
        <ListItem button component={Link} to='/virtual-lives'>
          {/* <ListItemIcon><EmojiPeopleIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Virtual Lives' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/database'>
          {/* <ListItemIcon><StorageIcon /></ListItemIcon> */}
          <ListItemIcon><GavelIcon /></ListItemIcon>
          <ListItemText primary='Database' />
        </ListItem>
        <ListItem button component={Link} to='/assets'>
          <ListItemIcon><PermMediaIcon /></ListItemIcon>
          <ListItemText primary='Assets' />
        </ListItem>
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
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
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
                <Notices />
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
              <Route path='/gachas'>
                <UnderConstruction />
              </Route>
              <Route path='/stories'>
                <UnderConstruction />
              </Route>
              <Route path='/virtual-lives'>
                <UnderConstruction />
              </Route>
              <Route path='/database'>
                <UnderConstruction />
              </Route>
              <Route path='/assets'>
                <Assets />
              </Route>
              <Route path='/my-profile'>
                <UnderConstruction />
              </Route>
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
