import { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import useSWR from 'swr';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import ReactJson from 'react-json-view';
import { OBJModel } from 'react-3d-viewer';
// import Viewer from 'react-viewer';
import Constants from 'lib/constants';

const getRequest = url => axios.get(url).then(r => r.data);

const Asset = ({ asset }) => {

  const url = `${Constants.ASSET_BASE_URL}${asset.path}`;
  const { data, error } = useSWR(
    asset.path.endsWith('.json') || !asset.path.includes('.') ? url : null,
    getRequest,
  );
  const [viewingImage, setViewingImage] = useState(false);
  if (asset.path.endsWith('.png')) {
    return <div>
      <div onClick={() => setViewingImage(true)}>
        <LazyLoadImage
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
          src={url}
          // placeholder={
          //     <CircularProgress />
          // }
          effect='opacity'
        />
      </div>
      {/* <Viewer
        visible={viewingImage}
        onClose={() => { setViewingImage(false); }}
        images={[{ src: url }]}
      /> */}
    </div>;
  }
  else if (asset.path.endsWith('.flac') || asset.path.endsWith('.ogg')) {
    return <ReactAudioPlayer
      style={{
        height: 100,
        width: '100%',
      }}
      src={url}
      controls
      volume={0.2}
    />;
  }
  else if (asset.path.endsWith('.mp4')) {
    return <ReactPlayer
      url={url}
      controls
      // volume={0.2}
      height='100%'
      width='100%'
      pip={true}
      stopOnUnmount={false}
    />;
  }
  else if (asset.path.endsWith('.json')) {
    return (
      <Paper style={{ height: '100%', margin: 8, padding: 16, backgroundColor: '#272822' }}>
        <ReactJson src={data} name={false} theme='monokai' displayDataTypes={false} />
      </Paper>
    );
  }
  else if (asset.path.endsWith('.obj')) {
    return <OBJModel
      src={url}
    />;
  }
  else if (!asset.path.includes('.')) {
    return <div>
      <code style={{
        display: 'block',
        whiteSpace: 'pre-wrap',
      }}>
        {data}
      </code>
    </div >;
  }
  return <div><Typography>Cannot display this file</Typography></div>;
}

export default Asset;