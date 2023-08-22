import {useRouteError} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {Grid, Typography} from '@mui/material';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `100vh`,
  width: '100%'
});

const StyledText = styled(Typography)(({theme: {breakpoints}}) => ({
  [breakpoints.down("md")]: {
    fontSize: 24
  },
  [breakpoints.down("sm")]: {
    fontSize: 14
  },
}));

const ErrorBoundary = () => {
  const error = useRouteError() as {message: string};
  console.error(error);

  return (
    <StyledContainer role="alert">
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <StyledText variant="h2">Something went wrong:</StyledText>
        </Grid>
        <Grid item xs={12}>
          <StyledText variant="h5">{error.message}</StyledText>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ErrorBoundary;