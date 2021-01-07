import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import moment from 'moment';

import {
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DataGrid } from '@material-ui/data-grid';

import JsonViewDialog from '../../components/JsonViewDialog';
import Constants from '../../constants';

function Database() {
  const [rowViewing, setRowViewing] = useState(null);
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [sortModel, setSortModel] = useState([]);
  const { data: collections } = useSWR(`${Constants.API_BASE_URL}database/collection-info/master?$limit=200`);
  const [collection, setCollection] = useState(null);
  const { data, isValidating } = useSWR(collection ?
    `${Constants.API_BASE_URL}database/master/${collection.collection}?$limit=${pageSize}&$skip=${pageSize * (page - 1)}&${sortModel.filter(sortField => sortField.sort).map(sortField => `$sort[${sortField.field}]=${sortField.sort === 'asc' ? 1 : -1}`).join('&')}`
    : null);

  const columns = data && data.data[0] ? Object.entries(data.data[0])
    // .filter(([k, v]) => typeof v !== 'object')
    .map(([k, v]) => {
      return {
        field: k,
        flex: 1,
        ...typeof v === 'object' ? {
          valueFormatter: ({ value }) => Array.isArray(value) ? 'Array' : 'Object',
          sortable: false,
          filterable: false,
        } : (k.endsWith('At') ? {
          valueFormatter: ({ value }) => moment(value).format('lll'),
        } : {})
      };
    }) : [];

  // console.log(rows, isValidating);

  useEffect(() => {
    if (data && !isValidating) {
      setRows(data.data.map((datum, i) => ({ id: i, ...datum })));
      setRowCount(data.total);
    }
  }, [isValidating]);

  //`${Constants.API_BASE_URL}database/master/${collection.collection}?$limit=${pageSize}&$skip=${pageSize * (page - 1)}&${Object.entries(sort).map(([k, v]) => `$sort[${k}]=${v}`).join('&')}`

  const handleRowClick = params => {
    // console.log('rowClick', params);
    setRowViewing(params.data);
  }
  const handlePageSizeChange = params => {
    if (params.pageSize !== pageSize) {
      // console.log('pageSizeChange', params);
      setPageSize(params.pageSize);
    }
  };
  const handlePageChange = params => {
    if (params.page !== page) {
      // console.log('pageChange', params);
      setPage(params.page);
    }
  };
  const handleFilterModelChange = params => {
    if (params.filterModel.items.length !== filterModel.items.length || params.filterModel.items.some((v, i) => v.field !== filterModel.items[i].field || v.sort !== filterModel.items[i].sort)) {
      // console.log('filterModelChange', params);
      setFilterModel(params.filterModel);
    }
  };
  const handleSortModelChange = params => {
    if (params.sortModel.length !== sortModel.length || params.sortModel.some((v, i) => v.field !== sortModel[i].field || v.sort !== sortModel[i].sort)) {
      // console.log('sortModelChange', params);
      setSortModel(params.sortModel);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 144px)' }}>
      {collections &&
        <Autocomplete
          options={collections.data}
          getOptionLabel={option => `${option.collection} - ${option.length} entries`}
          fullWidth
          value={collection}
          onChange={(event, newValue) => setCollection(newValue)}
          renderInput={(params) => <TextField {...params} label="Collection" variant="outlined" />}
        />
      }
      <div style={{ height: 8 }} />
      <DataGrid
        showToolbar
        density='compact'
        hideFooterSelectedRowCount

        rows={rows}
        columns={columns}
        rowCount={rowCount}

        onRowClick={handleRowClick}

        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50]}
        onPageSizeChange={handlePageSizeChange}

        paginationMode='server'
        page={page}
        onPageChange={handlePageChange}

        disableColumnFilter
        filterMode='server'
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}

        sortingMode='server'
        sortingModel={sortModel}
        onSortModelChange={handleSortModelChange}

        loading={isValidating}
      />
      <JsonViewDialog json={rowViewing} onClose={() => setRowViewing(null)} open={!!rowViewing} />
    </div>
  );
}

export default Database;