import {useCallback, memo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import PersonService from 'src/features/person/services/PersonService';
import {Grid, Pagination, TextField, Typography} from '@mui/material';
import Card from 'src/features/core/components/Card';
import useDebouncedSearch from 'src/features/core/hooks/useDebouncedSearch';
import {PeopleApiGetPeopleRequest} from 'src/generatedAPI';
import {styled} from '@mui/material/styles';

const PERSONS_KEY = 'PERSONS';

const StyledPagination = styled(Pagination)({
  justifyContent: 'flex-end',

  [`& ul`]: {
    justifyContent: 'flex-end',
  }
});

const PersonsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, debouncedSearch, setSearch] = useDebouncedSearch<string>('', 500);
  const {data, isFetching} = useQuery({
    queryKey: [PERSONS_KEY, {page, search: debouncedSearch}],
    queryFn: ({queryKey}) => PersonService.getPeople(queryKey[1] as PeopleApiGetPeopleRequest),
    keepPreviousData: true
  });

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  return (
    <>
      <Grid container marginBottom={2} justifyContent="space-between" alignItems="flex-end" flexWrap="nowrap">
        <Grid item xs={6} md={4}>
          <TextField
            label="Search"
            type="search"
            variant="standard"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Grid>
        <Grid item container display={{xs: 'none', sm: 'flex'}} md={4} justifyContent="center" alignItems="center">
          {isFetching && <Typography variant="h5">Loading...</Typography>}
          {data && data.count === 0 && <Typography variant="h5">No items</Typography>}
        </Grid>
        <Grid item xs={6} md={4} alignSelf="end">
          {data && (
            <StyledPagination disabled={isFetching} count={Math.ceil(data.count/data.pageSize)} page={page} onChange={handlePageChange} />
          )}
        </Grid>
      </Grid>
      {data && (
        <Grid container spacing={3} justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
          {data.results.map(person => {
            return (
              <Grid key={person.id} item xs={12} sm={6} md={4}>
                <Card person={person} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  );
};

export default memo(PersonsPage);