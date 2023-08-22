import React, {FC} from 'react';
import {FormContainer, TextFieldElement, RadioButtonGroup} from 'react-hook-form-mui'
import {IPerson} from 'src/features/person/services/PersonService';
import {Button, Grid} from '@mui/material';

interface IProps {
  person: IPerson,
  onSuccess: (data: IPerson) => void
  onCancel: () => void
}

const PersonForm: FC<IProps> = ({person, onSuccess, onCancel}) => {
  return (
    <FormContainer
      defaultValues={person}
      onSuccess={onSuccess}
    >
      <Grid container gap={2}>
        <Grid item md={5}>
          <TextFieldElement fullWidth name="name" label="Name" required />
        </Grid>
        <Grid item md={5}>
          <TextFieldElement fullWidth name="birth_year" label="Birth Year" required />
        </Grid>
        <Grid item md={5}>
          <TextFieldElement fullWidth name="height" label="Height" required />
        </Grid>
        <Grid item md={5}>
          <TextFieldElement fullWidth name="mass" label="Mass" required />
        </Grid>
        <Grid item md={5}>
          <TextFieldElement fullWidth name="eye_color" label="Eye Color" required />
        </Grid>
        <Grid item md={5}>
          <RadioButtonGroup
            label="Gender"
            name="gender"
            required
            row={true}
            options={[{id: 'male', label: 'male'}, {id: 'female', label: 'female'}]} />
        </Grid>
        <Grid item spacing={1} container xs={12}>
          <Button variant="outlined" type="submit" sx={{marginX: 2}}>Submit</Button>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </FormContainer>
  )
};

export default PersonForm;