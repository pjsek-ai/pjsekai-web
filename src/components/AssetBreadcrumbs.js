import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';


function AssetBreadcrumbs({ path }) {
  const pathParts = path.split('/');
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link color='inherit' component={RouterLink} to='/assets'>
          .
        </Link>
        {pathParts.map((value, index) => {
          const to = `/assets/${pathParts.slice(0, index + 1).join('/')}`;

          return index === pathParts.length - 1 ? (
            <Typography color='textPrimary' key={to}>
              {value}
            </Typography>
          ) : (
              <Link component={RouterLink} color='inherit' to={to} key={to}>
                {value}
              </Link>
            );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default AssetBreadcrumbs;