import React, {useCallback, useEffect} from 'react';
import {PeopleApi} from 'src/generatedAPI/api/people-api';

const api = new PeopleApi();

const PersonPage = () => {
  const getFacts = useCallback(async () => {
    const res = await api.getPersonById({id: '77'});
    return res;
  }, []);

  useEffect(() => {
    getFacts().then(res => {
      console.log(1)
    })
  }, [getFacts])

  return (
    <div>
      Person Page
    </div>
  );
};

export default PersonPage;