import React, {Suspense, lazy} from 'react';
import {Navigate, createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient} from '@tanstack/react-query'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister'
import Layout from './features/core/components/Layout';
import NotFound from './features/core/components/NotFound';
import FallbackLayout from './features/core/components/FallbackLayout';
import {Link as MuiLink, Typography} from '@mui/material';
import {People, Person} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {common} from '@mui/material/colors';

const PersonsPage = lazy(() => import('./features/person/components/PersonsPage'));
const PersonPage = lazy(() => import('./features/person/components/PersonPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 60, // 1 hour
      networkMode: 'offlineFirst',
    }
  }
});

const persister = createSyncStoragePersister({
  //used session storage for POC
  storage: window.sessionStorage,
})

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
  <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
    <Suspense fallback={<FallbackLayout />}>
      <RouterProvider router={router} />
    </Suspense>
  </PersistQueryClientProvider>
);

export default App;
