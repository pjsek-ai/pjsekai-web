import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from "swr";

function Notices() {

  const itemPerLoad = 20;

  const [showAll, setShowAll] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: normalData, mutate: normalMutate } = useSWR(`https://api.pjsek.ai/database/user/userInformations?informationType=normal&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);
  const { data: bugData, mutate: bugMutate } = useSWR(`https://api.pjsek.ai/database/user/userInformations?informationType=bug&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);
  const { data: contentData, mutate: contentMutate } = useSWR(`https://api.pjsek.ai/database/user/userInformations?informationType=content&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);

  let type, data, mutate;
  switch (tabIndex) {
    case 0:
      type = 'normal';
      data = normalData;
      mutate = normalMutate;
      break;
    case 1:
      type = 'bug';
      data = bugData;
      mutate = bugMutate;
      break;
    case 2:
      type = 'content';
      data = contentData;
      mutate = contentMutate;
      break;
  }

  return (
    <div>
      <Paper>
        <Tabs value={tabIndex} onChange={(event, newTabIndex) => setTabIndex(newTabIndex)} centered>
          <Tab label="Overview" />
          <Tab label="Bugs and issues" />
          <Tab label="Related sites" />
        </Tabs>

        <Container>
          {data &&
            <InfiniteScroll
              key={tabIndex}
              pageStart={0}
              loadMore={() => mutate(async data => {
                const nextData = await fetch(`https://api.pjsek.ai/database/user/userInformations?informationType=${type}&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}&$skip=${data.skip + data.limit}`).then(res => res.json());
                return {
                  ...data,
                  ...nextData,
                  data: [...data.data, ...nextData.data],
                };
              }, false)}
              hasMore={data.skip + data.limit < data.total}
              loader={<div key={0}>Loading ...</div>}
            >
              {data.data.map(notice => <Typography key={notice.id}>{notice.title}</Typography>)}
            </InfiniteScroll>
          }
        </Container>
      </Paper>
    </div>

  );
}

export default Notices;