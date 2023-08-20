import React, {Suspense, lazy} from 'react';
import {Navigate, createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Layout from './features/core/components/Layout';
import NotFound from './features/core/components/NotFound';
import FallbackLayout from './features/core/components/FallbackLayout';
import {Link as MuiLink, Typography} from '@mui/material';
import {People, Person} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {common} from '@mui/material/colors';

const queryClient = new QueryClient()
const PersonsPage = lazy(() => import('./features/person/components/PersonsPage'));
const PersonPage = lazy(() => import('./features/person/components/PersonPage'));

const PREFIX = 'App';
const classes = {
  icon: `${PREFIX}-icon`,
}

const StyledLink = styled(MuiLink)(({theme: {spacing}}) => ({
  display: 'flex',
  alignItems: 'center',
  color: common.white[100],
  textDecoration: 'none',

  [`& .${classes.icon}`]: {
    marginRight: spacing(0.5),
  },
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/persons",
        handle: {
          crumb: () => (
            <StyledLink href="/persons/">
              <People fontSize="large" className={classes.icon} />
              <Typography variant="h5">Persons</Typography>
            </StyledLink>
          ),
        },
        children: [
          {
            index: true,
            element: <PersonsPage />,
          },
          {
            path: "/persons/:id",
            element: <PersonPage />,
            handle: {
              crumb: () => (
                <StyledLink href="/persons/">
                  <Person fontSize="large" className={classes.icon} />
                  <Typography variant="h5">Person</Typography>
                </StyledLink>
              ),
            }
          },
        ]
      },
      {
        index: true,
        element: <Navigate to="/persons" replace />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<FallbackLayout />}>
      <RouterProvider router={router} />
    </Suspense>
  </QueryClientProvider>
);

export default App;
