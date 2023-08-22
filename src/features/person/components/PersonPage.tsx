import React, {FC, memo, useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Grid, Link, Paper, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import PersonService, {INamedEntity, IPerson} from 'src/features/person/services/PersonService';
import useSpecifiedQuery from 'src/features/core/hooks/useSpecifiedQuery';
import PersonDetails from 'src/features/person/components/PersonDetails';
import PersonForm from './PersonForm';
import {useQueryClient} from '@tanstack/react-query';

const PERSON_KEY = 'PERSON';
const STARSHIPS_KEY = 'STARSHIPS';
const FILMS_KEY = 'FILMS';
const SPECIES_KEY = 'SPECIES';
const VEHICLES_KEY = 'VEHICLES';

const PREFIX = 'Person';

const classes = {
  img: `${PREFIX}-imgArea`,
}

const StyledPaper= styled(Paper)(({theme: {spacing}}) => ({
  padding: spacing(2, 2),
  width: '100%'
}));

const renderLink = ({name, url}: INamedEntity) => <Link href={url}>{name}</Link>
const renderListArea = (name: string, items?: Array<INamedEntity>) => {
  if (!items || !items.length) return null;

  return (
    <>
      <Typography marginTop={2} variant="h5">{name}:</Typography>
      <Grid item container spacing={2}>
        {items.map(s => <Grid item key={s.id}>
          {renderLink({...s, url: `/${name.toLowerCase()}/${s.id}`})}
        </Grid>)}
      </Grid>
    </>
  )
}

const PersonPage: FC = () => {
  const {id} = useParams<{id: string}>();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {data: person, isFetching, error} = useSpecifiedQuery({key: PERSON_KEY, params: id, method: PersonService.getPerson})
  const {data: starships} = useSpecifiedQuery({key: STARSHIPS_KEY, params:  person?.starships, method: PersonService.getStarships, enabled: !!person?.starships})
  const {data: vehicles} = useSpecifiedQuery({key: VEHICLES_KEY, params:  person?.vehicles, method: PersonService.getVehicles, enabled: !!person?.vehicles})
  const {data: films} = useSpecifiedQuery({key: FILMS_KEY, params:  person?.films, method: PersonService.getFilms, enabled: !!person?.films})
  const {data: species} = useSpecifiedQuery({key: SPECIES_KEY, params:  person?.species, method: PersonService.getSpecies, enabled: !!person?.species})

  const onSubmit = useCallback((data: IPerson) => {
    //direct update
    queryClient.setQueryData([PERSON_KEY, id], {...person, ...data})
    setIsEditing(false);
  }, [id, person, queryClient])

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, [])

  return (
    <StyledPaper>
      <>
        {person && (
          <Grid container>
            <Grid item sx={{flex: '1 1'}}>
              {!isEditing && (
                <>
                  <PersonDetails person={person} />
                  <Grid item paddingTop={2}>
                    <Button variant="outlined" onClick={() => setIsEditing(val => !val)}>
                      Edit
                    </Button>
                  </Grid>
                </>
              )}
              {isEditing && <PersonForm person={person} onSuccess={onSubmit} onCancel={onCancel}/>}
              {renderListArea('Films', films)}
              {renderListArea('Starships', starships)}
              {renderListArea('Vehicles', vehicles)}
              {renderListArea('Species', species)}
            </Grid>
            <Grid item sx={{flex: '0 0 auto'}}>
              <Box
                component="img"
                className={classes.img}
                alt={person.name}
                src={person.imgSrc}
              />
            </Grid>
          </Grid>
        )}
        <Grid container justifyContent="center" alignItems="center">
          {error && <Typography variant="h5">{error.message}</Typography>}
          {isFetching && <Typography variant="h5">Loading...</Typography>}
        </Grid>
      </>
    </StyledPaper>
  );
};

export default memo(PersonPage);