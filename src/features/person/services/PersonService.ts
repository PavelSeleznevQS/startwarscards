import {PeopleApi, PeopleApiGetPeopleRequest} from 'src/generatedAPI/api/people-api';

const api = new PeopleApi();
const PAGE_SIZE = 10;

//TODO Change Backend API to contain url property
function getIdByUrl(url: string) {
  return url.split("/").at(-2) as string;
}

function getPeople({page, search} : PeopleApiGetPeopleRequest) {
  return api.getPeople({page, search})
    .then(r => ({
      ...r.data,
      results: r.data.results.map(p => ({...p, id: getIdByUrl(p.url)})),
      pageSize: PAGE_SIZE,
    }))
}

const exported = {
  getPeople,
};

export default exported;