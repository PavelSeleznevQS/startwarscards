import {styled} from '@mui/material/styles';
import {Typography} from '@mui/material';
import {HEADER_HEIGHT, PADDINGS} from 'src/features/core/components/Layout';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `calc(100vh - ${(HEADER_HEIGHT + PADDINGS.TOP_BOTTOM) * 8}px)`,
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


const NotFound = () => {
  return (
    <StyledContainer>
      <StyledText variant="h2">Page not found</StyledText>
    </StyledContainer>
  );
};

export default NotFound;