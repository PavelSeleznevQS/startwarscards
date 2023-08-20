import {memo} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {styled, useTheme} from '@mui/material/styles';
import {grey, common} from '@mui/material/colors';
import Logo from 'src/features/core/images/star-wars.svg';
import {Grid} from '@mui/material';
import BreadCrumbs from 'src/features/core/components/BreadCrumbs';

export const HEADER_HEIGHT = 15;
export const PADDINGS = {
  TOP_BOTTOM: 2,
  LEFT_RIGHT: 2
};

const PREFIX = 'Layout';
const classes = {
  logo: `${PREFIX}-logo`,
  link: `${PREFIX}-link`,
  text: `${PREFIX}-text`,
  body: `${PREFIX}-body`,
}

const StyledContainer = styled('div')(({theme: {breakpoints, spacing}}) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',

  [`& header`]: {
    height: spacing(7),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: grey[800],
    padding: spacing(2),
    minWidth: spacing(50)
  },

  [`& .${classes.logo}`]: {
    height: spacing(7),
    width: spacing(14),
  },

  [`& .${classes.link}`]: {
    textDecoration: 'none'
  },

  [`& .${classes.text}`]: {
    color: common.white,
    [breakpoints.down("sm")]: {
      display: 'none'
    },
  },
}));

const Layout = () => {
  const {spacing} = useTheme();

  return (
    <StyledContainer>
      <header>
        <Link className={classes.link} to="/">
          <img src={Logo} className={classes.logo} alt="star wars logo" />
        </Link>
        <BreadCrumbs />
      </header>
      <Grid container sx={{justifyContent: 'center', px: PADDINGS.LEFT_RIGHT}}>
        <Grid container sx={{py: PADDINGS.TOP_BOTTOM, maxWidth: spacing(150), minWidth: spacing(50)}}>
          <Outlet />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default memo(Layout);