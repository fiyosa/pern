import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IRoles } from '../model'

export const getRoles = (): AxiosPromise<IRoles> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/role`,
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
