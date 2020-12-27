import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import AssetDirectory from '../../components/AssetDirectory';
import AssetBreadcrumbs from '../../components/AssetBreadcrumbs';
import AssetViewer from '../../components/AssetViewer';
import useSWR, { SWRConfig } from 'swr';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


function Assets() {
  const location = useLocation();
  const history = useHistory();
  const assetPath = location.pathname.split('/').filter((x, i) => i > 1 && x).join('/');
  const { data: assetNode } = useSWR(`https://api.pjsek.ai/assets?path=${assetPath}`);

  const [selectedPath, setSelectedPath] = useState(assetPath);
  useEffect(() => {
    setSelectedPath(assetPath);
  }, [location]);

  const directoryPath = assetNode && assetNode.data[0] && assetPath && !assetNode.data[0].isDir ? assetNode.data[0].parent : assetPath;

  const { data: directoryData } = useSWR(assetNode && (!assetPath || assetNode.data[0]) ? `https://api.pjsek.ai/assets?parent=${directoryPath}&$limit=1000&$sort[isDir]=-1&$sort[path]=1` : null);

  let bottomComponent = <div />;
  if (assetNode) {
    if (!assetPath) {
      bottomComponent = (
        <AssetDirectory
          data={directoryData}
          selectedPath={selectedPath}
          onSelect={node => { setSelectedPath(node.path); }}
          onEnter={node => { history.push(`/assets/${node.path}`); }}
        />
      );
    }
    else if (assetNode.data[0]) {
      bottomComponent = assetNode.data[0].isDir ?
        <AssetDirectory
          data={directoryData}
          selectedPath={selectedPath}
          onSelect={node => { setSelectedPath(node.path); }}
          onEnter={node => { history.push(`/assets/${node.path}`); }}
        /> :
        <AssetViewer asset={assetNode.data[0]} />;
    }
    else {
      bottomComponent = <div>asset not found</div>;
    }
  }
  else {
    bottomComponent = <div>loading...</div>;
  }

  let buttonComponent = assetNode && assetNode.data[0] && !assetNode.data[0].isDir ?
    <Grid container direction="row">
      <CopyToClipboard text={`https://assets.pjsek.ai/file/pjsekai-assets/${assetPath}`}>
        <Button variant="contained" color="primary">
          Copy asset URL
      </Button>
      </CopyToClipboard>
      <div style={{ paddingLeft: 8 }}>
        <Button variant="contained" color="primary" href={`https://assets.pjsek.ai/file/pjsekai-assets/${assetPath}`} target='_blank' download>
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
    <div>
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
      { bottomComponent}
    </div >
  );


}

export default Assets;