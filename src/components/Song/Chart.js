import React from 'react';

import chart2svg from 'lib/chart2svg';

function Chart({ chartString, ...props }) {
  return (
    <div {...props}>
      <div dangerouslySetInnerHTML={{ __html: chart2svg(chartString, '/images/song/chart') }} />
    </div>
  );
}

export default Chart;

