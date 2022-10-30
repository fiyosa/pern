import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'

export const getMessageReadAccount = (): AxiosPromise<IResponse> => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/auth/message/read`,
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
