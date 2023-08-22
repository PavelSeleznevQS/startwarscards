import React, {FC, memo, ReactNode} from 'react';
import FieldDetail from 'src/features/person/components/FieldDetail';
import {IPerson} from 'src/features/person/services/PersonService';
import {Link} from '@mui/material';

interface IProps {
  person: IPerson
}

const renderLink = ({name, url}: {name: string, url: string}) => <Link href={url}>{name}</Link>

const PersonDetails: FC<IProps> = ({person}) => {
  return (
    <>
      <FieldDetail name="Name" value={person.name} />
      <FieldDetail name="Birth Year" value={person.birth_year} />
      <FieldDetail name="Height" value={`${person.height} cm`} />
      <FieldDetail name="Mass" value={`${person.mass} kg`} />
      <FieldDetail name="Gender" value={person.gender} />
      <FieldDetail name="Eye Color" value={person.eye_color} />
      {person.homeWorldEntity && (
        <FieldDetail name="Home world"
                     value={{name: person.homeWorldEntity.name, url: `/planets/${person.homeWorldEntity.id}`}}
                     renderCmp={renderLink as (val: unknown) => ReactNode} />
      )}
    </>
  );
};

export default memo(PersonDetails);