import {memo, ReactNode} from 'react';
import {useMatches} from 'react-router-dom';
import {Breadcrumbs} from '@mui/material';

type Crumb = (data: unknown) => ReactNode;
const BreadCrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => match.handle && (match.handle as {crumb: Crumb}).crumb)
    .map((match) => (match.handle as {crumb: Crumb}).crumb(match.data));

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </Breadcrumbs>
  );
};

export default memo(BreadCrumbs);