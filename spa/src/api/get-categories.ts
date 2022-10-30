import axios, { AxiosPromise } from 'axios'
import { ICategories } from '../model'
import { handlerResponse, headerAuth } from '../utils'

export const getCategories = (url?: string): AxiosPromise<ICategories> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/category${url}`,
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
