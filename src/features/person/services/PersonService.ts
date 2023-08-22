import {
  Person,
  PlanetsApi,
  PeopleApi,
  PeopleApiGetPeopleRequest,
  StarshipsApi,
  FilmsApi,
  VehiclesApi,
  SpeciesApi
} from 'src/generatedAPI';
import type {AxiosResponse} from "axios";

const peopleApi = new PeopleApi();
const planetsApi = new PlanetsApi();
const starshipsApi = new StarshipsApi();
const filmsApi = new FilmsApi();
const vehiclesApi = new VehiclesApi();
const speciesApi = new SpeciesApi();

const PAGE_SIZE = 10;

export interface INamedEntity {
  id: string;
  url: string,
  name: string
}

export interface IPerson extends Person {
  id: string;
  imgSrc: string;
  homeWorldEntity?: INamedEntity
}

const getIdByUrl = (url: string): string => url.split("/").at(-2) as string;

//TODO Change Backend API to contain id property
function transformPerson(data: Person): IPerson {
  const id = getIdByUrl(data.url);

  return {
    ...data,
    id,
    imgSrc: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
  }
}

function loadHomeWorld(person: IPerson) {
  const id = getIdByUrl(person.homeworld);

  return Promise.all([planetsApi.getPlanetById({id})]).then(([planet]) => {
    return {
      ...person,
      homeWorldEntity: {id, ...planet.data}
    }
  })
}

function getPerson(id: string) {
  return peopleApi.getPersonById({id})
    .then(r => transformPerson(r.data))
    .then(loadHomeWorld)
}

function getPeople({page, search} : PeopleApiGetPeopleRequest) {
  return peopleApi.getPeople({page, search})
    .then(r => ({
      ...r.data,
      results: r.data.results.map(transformPerson),
      pageSize: PAGE_SIZE,
    }))
}

function getListItems<T extends {name?: string, title?: string, url: string}>(urls: Array<string>, apiMethod: (({id}: {id:string}) => Promise<AxiosResponse<T>>)) {
  const ids = urls.map(getIdByUrl);
  return Promise.all(ids.map(id => apiMethod({id})))
    .then(responses => responses.map(r => ({...r.data, name: (r.data.name || r.data.title) as string, id: getIdByUrl(r.data.url)})))
}

function getStarships(urls: Array<string>) {
  return getListItems(urls, (args) => starshipsApi.getStarshipById(args));
}

function getFilms(urls: Array<string>) {
  return getListItems(urls, (args) => filmsApi.getFilmById(args));
}

function getVehicles(urls: Array<string>) {
  return getListItems(urls, (args) => vehiclesApi.getVehicleById(args));
}

function getSpecies(urls: Array<string>) {
  return getListItems(urls, (args) => speciesApi.getSpeciesById(args));
}

const exported = {
  getPeople,
  getPerson,
  getStarships,
  getFilms,
  getSpecies,
  getVehicles
};

export default exported;