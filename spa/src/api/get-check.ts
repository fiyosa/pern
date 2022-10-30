import { ICheck } from '../model'
import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const getCheck = (): AxiosPromise<ICheck> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/check`,
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
