import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ImageIcon from '@material-ui/icons/Image';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import TreeItem from '@material-ui/lab/TreeItem';

function AssetNode({ node, cache, onClick }) {

  let icon;
  if (node.path.endsWith('.png')) {
    icon = <ImageIcon />;
  }
  else if (node.path.endsWith('.flac') || node.path.endsWith('.ogg')) {
    icon = <AudiotrackIcon />;
  }
  else if (node.path.endsWith('.mp4')) {
    icon = <OndemandVideoIcon />;
  }
  else if (node.path.endsWith('.json')) {
    icon = <DescriptionIcon />;
  }
  else if (node.path.endsWith('.obj')) {
    icon = <CategoryIcon />;
  }
  else if (!node.path.includes('.')) {
    icon = <DescriptionIcon />;
  }

  return <TreeItem
    nodeId={node.path}
    label={node.parent.length > 0 ? node.path.substring(node.parent.length + 1) : node.path}
    onIconClick={() => onClick(node)}
    onLabelClick={() => onClick(node)}
    endIcon={icon}
  >
    {cache[node.path] ?
      cache[node.path].data.map(node => <AssetNode key={node.path} node={node} cache={cache} onClick={onClick} />) :
      node.isDir && <TreeItem
        nodeId={`[${node.path}]loadingChildren`}
        label='Loading...'
      />
    }
  </TreeItem>
}

function AssetTree({ cache, expanded, selected, onClick }) {
  return (
    <TreeView
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      expanded={expanded}
      selected={selected}
    >
      {cache[''] &&
        cache[''].data.map(node => <AssetNode key={node.path} node={node} cache={cache} onClick={onClick} />)
      }
    </TreeView>
  );
}

export default AssetTree;