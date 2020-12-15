import { useState } from 'react';
import useSWR from 'swr';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';


const getRequest = url => axios.get(url).then(r => r.data);

const TreeNode = ({ node, loadChildren, apiDomain, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const { data, error } = useSWR(
    loadChildren && node.isDir ? `https://${apiDomain}/assets?parent=${node.path}&$limit=1000` : null,
    getRequest,
  );
  return <TreeItem
    key={node.path}
    nodeId={node.path}
    label={node.parent.length > 0 ? node.path.substring(node.parent.length + 1) : node.path}
    onIconClick={() => { onClick(node); setExpanded(!expanded) }}
    onLabelClick={() => { onClick(node); setExpanded(!expanded) }}
  >
    {data ?
      data.data.map(node => <TreeNode key={node.path} node={node} apiDomain={apiDomain} loadChildren={expanded} onClick={onClick} />) :
      node.isDir && <TreeItem
        nodeId={node.path + 'Child'}
        label='loading...'
      />
    }
  </TreeItem>
};

export default TreeNode;

