import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AssetDirectory from 'components/AssetDirectory';
import AssetBreadcrumbs from 'components/AssetBreadcrumbs';
import AssetTree from 'components/AssetTree';
import AssetViewer from 'components/AssetViewer';

import useSWR, { mutate } from 'swr';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Constants from 'lib/constants';

function Assets() {
  const sm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme => theme.breakpoints.up('md'));
  const location = useLocation();
  const history = useHistory();
  const assetPath = location.pathname.split('/').filter((x, i) => i > 1 && x).join('/');
  const { data: assetNode } = useSWR(`${Constants.API_BASE_URL}assets?path=${assetPath}`);

  const [selectedPath, setSelectedPath] = useState(assetPath);
  useEffect(() => {
    setSelectedPath(assetPath);
  }, [assetPath]);

  const directoryPath = assetNode && assetNode.data[0] && assetPath && !assetNode.data[0].isDir ? assetNode.data[0].parent : assetPath;

  const [directoryCache, setDirectoryCache] = useState({});

  const [expandedTreeNodes, setExpandedTreeNodes] = useState([]);

  const select = node => setSelectedPath(node.path);
  const enter = node => {
    if (node.isDir) {
      setExpandedTreeNodes(prevExpandedTreeNodes => [...prevExpandedTreeNodes, node.path]);
    }
    history.push(`/assets/${node.path}`);
  };

  const cache = async path => {
    const directoryData = await fetch(`${Constants.API_BASE_URL}assets?parent=${path}&$limit=10000&$sort[isDir]=-1&$sort[path]=1`).then(res => res.json());
    setDirectoryCache(prevDirectoryCache => ({ ...prevDirectoryCache, [path]: directoryData }));
    return directoryData;
  }

  useEffect(() => {
    const ancestors = directoryPath.split('/').reduce((acc, cur, i) => i > 0 ? [...acc, `${acc[acc.length - 1]}/${cur}`] : [...acc, cur], [''])
    setExpandedTreeNodes(prevExpandedTreeNodes => [...prevExpandedTreeNodes, ...ancestors]);
    ancestors.forEach(ancestor => {
      if (!(ancestor in directoryCache)) {
        cache(ancestor);
      }
    });
  }, [directoryPath]);

  let bottomComponent = <div />;
  if (assetNode) {
    if (!assetPath) {
      bottomComponent = (
        <AssetDirectory
          data={directoryCache[directoryPath]}
          selectedPath={selectedPath}
          onSelect={sm ? select : enter}
          onEnter={enter}
        />
      );
    }
    else if (assetNode.data[0]) {
      bottomComponent = assetNode.data[0].isDir ?
        <AssetDirectory
          data={directoryCache[directoryPath]}
          selectedPath={selectedPath}
          onSelect={sm ? select : enter}
          onEnter={enter}
        /> :
        <AssetViewer asset={assetNode.data[0]} />;
    }
    else {
      bottomComponent = <div><Typography>Asset not found</Typography></div>;
    }
  }
  else {
    bottomComponent = <div><Typography>Loading...</Typography></div>;
  }

  let buttonComponent = assetNode && assetNode.data[0] && !assetNode.data[0].isDir ?
    <Grid container direction="row">
      <CopyToClipboard text={`${Constants.ASSET_BASE_URL}${assetPath}`}>
        <Button variant="contained" color="primary">
          Copy asset URL
      </Button>
      </CopyToClipboard>
      <div style={{ paddingLeft: 8 }}>
        <Button variant="contained" color="primary" href={`${Constants.ASSET_BASE_URL}${assetPath}`} target='_blank' download>
          Download
      </Button>
      </div>
    </Grid> :
    <div>
      <CopyToClipboard text={`https://pjsek.ai/assets/${assetPath}`}>
        <Button variant="contained" color="primary">
          Copy folder URL
        </Button>
      </CopyToClipboard>
    </div>;

  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <Grid
        style={{ height: '100%' }}
        container
        direction="row"
        wrap='nowrap'
        spacing={1}
      >
        {md &&
          <Grid item xs={3} xl={4}>
            <Paper style={{ padding: 8, paddingTop: 12, overflow: 'auto', height: '100%' }}>
              {directoryCache && <AssetTree
                cache={directoryCache}
                expanded={expandedTreeNodes}
                selected={assetPath}
                onClick={async node => {
                  if (node.path === assetPath && !node.isDir) {
                    history.push(`/assets/${node.parent}`);
                  }
                  else if (expandedTreeNodes.includes(node.path)) {
                    setExpandedTreeNodes(prevExpandedTreeNodes => prevExpandedTreeNodes.filter(expandedPath => expandedPath !== node.path));
                    history.push(`/assets/${node.parent}`);
                  }
                  else {
                    enter(node);
                    mutate(`${Constants.API_BASE_URL}assets?path=${node.path}`, { limit: 1, skip: 0, data: [node] });
                    if (node.isDir) {
                      let dirs = directoryCache[node.path];
                      if (!dirs) {
                        dirs = await cache(node.path);
                      }
                      if (dirs.data.length <= 5) {
                        dirs.data.forEach(dir => {
                          if (!(dir.path in directoryCache)) {
                            cache(dir.path);
                          }
                        });
                      }
                    }
                  }
                }}
              />}
            </Paper>
          </Grid>}
        <Grid item xs>
          <Paper style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{ padding: 8 }}
              >
                <AssetBreadcrumbs path={assetPath} />
                <div>
                  {buttonComponent}
                </div>
              </Grid >
              {bottomComponent}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div >
  );


}

export default Assets;
