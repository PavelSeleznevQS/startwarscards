import {memo} from 'react';
import {useMatches} from 'react-router-dom';
import {Breadcrumbs} from '@mui/material';

const BreadCrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => match.handle && (match.handle as any).crumb)
    .map((match) => (match.handle as any).crumb(match.data));

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </Breadcrumbs>
  );
};

export default memo(BreadCrumbs);