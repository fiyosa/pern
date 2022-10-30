import axios, { AxiosPromise } from 'axios'
import { ICategory } from '../model'
import { handlerResponse, headerAuth } from '../utils'

export const getCategoryById = (url?: string): AxiosPromise<ICategory> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/category/${url}`,
    headers: headerAuth,
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}
