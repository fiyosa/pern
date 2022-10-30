import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IAuthUser } from '../model'

export const getUserAccount = (): AxiosPromise<IAuthUser> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/auth/user`,
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
