import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR from "swr";

import NoticeCard from 'components/NoticeCard';
import NoticeDialog from 'components/NoticeDialog';
import Constants from 'lib/constants';

function Notices() {

  const itemPerLoad = 20;

  const [showAll, setShowAll] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  // const [normalNotices, setNormalNotices] = useState({});
  // const [normalNotices, setNormalNotices] = useState({});
  const { data: normalData, mutate: normalMutate } = useSWR(`${Constants.API_BASE_URL}database/user/userInformations?informationType=normal&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);
  const { data: bugData, mutate: bugMutate } = useSWR(`${Constants.API_BASE_URL}database/user/userInformations?informationType=bug&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);
  const { data: contentData, mutate: contentMutate } = useSWR(`${Constants.API_BASE_URL}database/user/userInformations?informationType=content&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}`);

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

        {data &&
          <InfiniteScroll
            key={tabIndex}
            pageStart={0}
            loadMore={() => mutate(async data => {
              const nextData = await fetch(`${Constants.API_BASE_URL}database/user/userInformations?informationType=${type}&$limit=${itemPerLoad}&$sort${showAll ? '[startAt]=-1' : '[seq]=1'}&$skip=${data.skip + data.limit}`).then(res => res.json());
              return {
                ...data,
                ...nextData,
                data: [...data.data, ...nextData.data],
              };
            }, false)}
            hasMore={data.skip + data.limit < data.total}
            loader={
              <div key={0}>
                <Typography align='center'>
                  Loading...
                </Typography>
              </div>
            }
          >
            {data.data.map(entry => {
              return (
                <NoticeCard notice={entry} onNoticeClick={(entry) => {
                  if (entry.browseType === 'internal') {
                    setNotice(entry);
                    setOpen(true);
                  }
                  else {
                    window.open(entry.path, "_blank");
                  }
                }} key={entry.id} />
              );
            })}
            <div style={{ height: 16 }} />
          </InfiniteScroll>
        }
      </Paper>
      {notice &&
        <NoticeDialog notice={notice} onClose={() => { setOpen(false); }} open={open} />
      }
    </div>

  );
}

export default Notices;