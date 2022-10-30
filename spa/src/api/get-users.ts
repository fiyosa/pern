import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IUsers } from '../model'

export const getUsers = (props?: string): AxiosPromise<IUsers> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/user${props}`,
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
