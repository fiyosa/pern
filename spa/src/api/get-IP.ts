import { headerPublic } from '../utils'
import axios, { AxiosPromise } from 'axios'
import { IIp } from '../model'

export const getIP = (): AxiosPromise<IIp> => {
  return axios({
    method: 'get',
    url: `http://ip-api.com/json`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response
    })
}
