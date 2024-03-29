import axios from "axios";
import { Episode, Serie } from "../@types/serie";
import https from 'https'
import { Result } from "../@types/result";

const api = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

// Auth
export async function loginUser(username: string, password: string)
{
  const response = await api.post(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/login', {
    username: username, password: password
  })
  return response.data
}
export async function registerUser(username: string, fullName: string, email: string ,password: string)
{
  const response = await api.post(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/register', {
    username: username, fullName: fullName, email: email, password: password
  })
  return response.data
}
export async function getProfile(token: string)
{
  const response = await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/profile', {headers: {'Authorization': `Bearer ${token}`}})
  return response.data
}
export async function updateProfile(username: string, fullName: string, email: string ,password: string)
{
  const response = await api.put(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/update', {
    username: username, fullName: fullName, email: email, password: password
  })
  return response.data
}

// FLIX

export async function getSeries(search? : string, currentPage = 1, pageSize = 24, orderBy? : string, sortOrder? : string, keys? : string)
{
  let result : Result = {} as Result
  try{
    const response = await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/series', {params: {search: search,currentPage: currentPage, pageSize: pageSize, orderBy: orderBy, sortOrder: sortOrder, keys : keys}})
    result = response.data
  }
  catch(err : any){ console.error('Error ao consumir api getSeries ' + err.code) }

  return result
}

export async function getSerieByKey(key : string)
{
  let serie : Serie = {} as any;
  try{
    const response = await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/series/' + key)
    serie = response.data
  }
  catch(err : any){ console.error('Err: getSeriesByKey: ' + key + ' : ' + err.response.data) }
  return serie
}
export async function addViewSerie(key? : string)
{
  try{
    await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/series/addview/' + key)
  }
  catch(err : any){ console.error('Err: addViewEpisode: ' + key + ' : ' + err) }
}

export async function getEpisodeByKey(key? : string)
{
  let episode : Episode = {} as Episode;
  try{
    const response = await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/episodes/' + key)
    episode = response.data
  }
  catch(err : any){ console.error('Err: getEpisodeByKey: ' + key + ' : ' + err.response.data) }
  return episode
}
export async function addViewEpisode(key? : string)
{
  try{
    await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/episodes/addview/' + key)
  }
  catch(err : any){ console.error('Err: addViewEpisode: ' + key + ' : ' + err) }
}
export async function getLastEpisodes(currentPage = 1, pageSize = 24)
{
  let result : Result = {} as Result
  try{
    const response = await api.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/episodes/last', {params: {currentPage: currentPage, pageSize: pageSize}})
    result = response.data
  }
  catch(err : any){ console.error('Error ao consumir api getLastEpisodes ' + err.code) }

  return result
}