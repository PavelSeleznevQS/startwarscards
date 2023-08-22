import {memo, ReactNode} from 'react';
import {Grid, Typography} from '@mui/material';

interface IProps<T> {
  value: T,
  name: string,
  renderCmp?: (val: T) => ReactNode
}

const renderText = (value: ReactNode) => <Typography variant="body1">{value}</Typography>

const FieldDetail = <T,>(props: IProps<T>) => {
  const {name, value, renderCmp = renderText} = props;
    return (
    <Grid item container>
      <Grid item flex="0 0 100px">
        <Typography variant="body1">{name}:</Typography>
      </Grid>
      <Grid item flex="1 1">
        {renderCmp(value as ReactNode & T)}
      </Grid>
    </Grid>
  );
};

export default memo(FieldDetail)