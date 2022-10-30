import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const getLogout = (): AxiosPromise<void> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/logout`,
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
