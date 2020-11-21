import { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactAudioPlayer from 'react-audio-player';
import useSWR from 'swr';
// import dynamic from 'next/dynamic'

// const Viewer = dynamic(
//   () => import('react-viewer'),
//   { ssr: false }
// )

const getRequest = url => axios.get(url).then(r => r.data);

const Asset = ({ info, assetBaseUrl }) => {

  const url = `${assetBaseUrl}/${info.path}`;
  const { data, error } = useSWR(
    !info.path.includes('.') ? url : null,
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
    </div>
  }
  else if (info.path.endsWith('.flac')) {
    return <ReactAudioPlayer
      src={url}
      controls
      volume={0.2}
    />
  }
  else if (!info.path.includes('.')) {
    console.log(data)
    return <div>
      <code style={{
        display: 'block',
        whiteSpace: 'pre-wrap',
      }}>
        {data}
      </code>
    </div >
  }
}

export default Asset;