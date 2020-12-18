import { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPlayer from 'react-player';
import useSWR from 'swr';
import Typography from '@material-ui/core/Typography';


import dynamic from 'next/dynamic';

const ReactJson = dynamic(
  () => import('react-json-view'),
  { ssr: false }
);

// const { OBJModel } = dynamic(
//   () => import('react-3d-viewer'),
//   { ssr: false }
// );

// const Viewer = dynamic(
//   () => import('react-viewer'),
//   { ssr: false }
// );

const getRequest = url => axios.get(url).then(r => r.data);

const Asset = ({ info, assetBaseUrl }) => {

  const url = `${assetBaseUrl}/${info.path}`;
  const { data, error } = useSWR(
    info.path.endsWith('.json') || !info.path.includes('.') ? url : null,
    getRequest,
  );
  const [viewingImage, setViewingImage] = useState(false);
  if (info.path.endsWith('.png')) {
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
  else if (info.path.endsWith('.flac') || info.path.endsWith('.ogg')) {
    return <ReactPlayer
      url={url}
      controls
      volume={0.2}
      height='100%'
      width='100%'
    />;
  }
  else if (info.path.endsWith('.mp4')) {
    return <ReactPlayer
      url={url}
      controls
      volume={0.2}
      height='100%'
      width='100%'
      pip={true}
      stopOnUnmount={false}
    />;
  }
  else if (info.path.endsWith('.json')) {
    return <ReactJson src={data} name={false} />;
  }
  else if (info.path.endsWith('.obj')) {
    // return <OBJModel
    //   src={url}
    // />;
  }
  else if (!info.path.includes('.')) {
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