import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import TreeNode from '../components/TreeNode';
import Asset from '../components/Asset';

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
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const getRequest = url => axios.get(url).then(r => r.data);

export async function getServerSideProps(context) {
  const apiDomain = 'api.pjsek.ai';
  const assetBaseUrl = 'https://assets.pjsek.ai/file/pjsekai-assets';
  const rootItems = await getRequest(`https://${apiDomain}/assets?parent=&$limit=200`);

  return {
    props: {
      assetBaseUrl,
      apiDomain,
      rootItems,
    }
  };
}

export default function Events({ assetBaseUrl, apiDomain, rootItems }) {

  const classes = useStyles();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const onClick = node => {
    // console.log(node);
    if (!node.isDir) {
      setCurrentFile(node);
    }
  }

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Typography variant='h6' noWrap>
          Assets
        </Typography>
      </div>
      <Divider />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {rootItems.data.map(node => <TreeNode key={node.path} node={node} apiDomain={apiDomain} loadChildren={true} onClick={onClick} />)}
      </TreeView>
    </div>
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>Assets</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AppBar
        position='fixed'
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => setMobileOpen(!mobileOpen)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap className={classes.title}>
            {currentFile && currentFile.path}
          </Typography>
          {currentFile &&
            <Button color='inherit'>
              <a href={`${assetBaseUrl}/${currentFile.path}`} target='_blank' download>
                Download
              </a>
            </Button>
          }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
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
        {currentFile &&
          <Asset key={currentFile.path} info={currentFile} assetBaseUrl={assetBaseUrl} />
        }
      </main>
    </div >
  );
}