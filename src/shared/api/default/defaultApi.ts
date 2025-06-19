import axios from 'axios'

const baseURL = 'https://rickandmortyapi.com/api'

export const $api = axios.create({
  baseURL: `${baseURL}`,
})
