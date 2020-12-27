import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import moment from 'moment';

function AssetDirectory({ data, selectedPath, onSelect, onEnter }) {


  return (
    <TableContainer component={Paper}>
      <Table aria-label="children">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Date modified</TableCell>
            <TableCell align="right">Data version modified</TableCell>
            <TableCell align="right">Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.data.map((row) => {
            let icon;
            if (row.isDir) {
              icon = <FolderIcon />;
            }
            else if (row.path.endsWith('.png')) {
              icon = <ImageIcon />;
            }
            else if (row.path.endsWith('.flac') || row.path.endsWith('.ogg')) {
              icon = <AudiotrackIcon />;
            }
            else if (row.path.endsWith('.mp4')) {
              icon = <OndemandVideoIcon />;
            }
            else if (row.path.endsWith('.json')) {
              icon = <DescriptionIcon />;
            }
            else if (row.path.endsWith('.obj')) {
              icon = <CategoryIcon />;
            }
            else if (!row.path.includes('.')) {
              icon = <DescriptionIcon />;
            }
            return <TableRow
              hover
              selected={row.path === selectedPath}
              key={row.path}
              onClick={event => onSelect(row)}
              onDoubleClick={event => onEnter(row)}
            >
              <TableCell>
                {icon}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.path.split('/').slice(-1)[0]}
              </TableCell>
              <TableCell align="right">{moment(row.datetime).fromNow()}</TableCell>
              <TableCell align="right">{row.assetVersion}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssetDirectory;