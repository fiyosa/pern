import axios, { AxiosPromise } from 'axios'
import { IIp, IResponse } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IPostIpProps extends IIp {
  blog_id: string
}

export const postIp = (props: IPostIpProps): AxiosPromise<IResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/ip`,
    headers: headerAuth,
    data: {
      ip: props.query,
      country: props.country,
      regionName: props.regionName,
      city: props.city,
      isp: props.isp,
      timezone: props.timezone,
      blog_id: props.blog_id,
    },
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}
