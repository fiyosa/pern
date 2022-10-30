import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IPostMessage {
  user_id: string
  description: string
}

export const postMessage = (props: IPostMessage): AxiosPromise<IResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/message`,
    headers: headerAuth,
    data: {
      user_id: props.user_id,
      description: props.description,
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
