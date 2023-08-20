import {FC, memo} from 'react';
import {Grid, Typography} from '@mui/material';

interface IProps {
  value: any,
  name: string,
  renderCmp?: any
}

const renderText = (value: IProps['value']) => <Typography variant="body1">{value}</Typography>

const FieldDetail: FC<IProps> = ({name, value, renderCmp = renderText}) => {
  return (
    <Grid item container>
      <Grid item flex="0 0 100px">
        <Typography variant="body1">{name}:</Typography>
      </Grid>
      <Grid item flex="1 1">
        {renderCmp(value)}
      </Grid>
    </Grid>
  );
};

export default memo(FieldDetail)