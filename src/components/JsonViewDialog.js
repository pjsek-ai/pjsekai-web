import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ReactJson from 'react-json-view';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Constants from 'lib/constants';

function JsonViewDialog({ json, onClose, open }) {

  return (
    <Dialog maxWidth={false} fullWidth onClose={onClose} open={open}>
      <DialogContent style={{ height: '75vh', backgroundColor: '#272822' }}>
        <ReactJson src={json} name={false} theme='monokai' displayDataTypes={false} />
      </DialogContent>
      <DialogActions>
        <CopyToClipboard text={JSON.stringify(json, null, 2)}>
          <Button variant="contained" color="primary">
            Copy JSON
        </Button>
        </CopyToClipboard>
        <Button variant="contained" onClick={onClose} color="primary" autoFocus>
          Close
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JsonViewDialog;