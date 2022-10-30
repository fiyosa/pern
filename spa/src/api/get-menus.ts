import { IMenus } from '../model'
import { handlerResponse, headerAuth, headerPublic } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const getMenusPublic = (): AxiosPromise<IMenus> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/auth/menu`,
    headers: headerPublic,
    data: {},
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

export const getMenusAuth = (): AxiosPromise<IMenus> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/menu`,
    headers: headerAuth,
    data: {},
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}
