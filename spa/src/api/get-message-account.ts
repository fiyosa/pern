import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IMessages } from '../model'

export const getMessageAccount = (): AxiosPromise<IMessages> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/auth/message`,
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
