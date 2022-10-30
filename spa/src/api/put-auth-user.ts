import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IPutAuthUserProfileProps {
  user_id: string
  first_name: string
  last_name: string
}

interface IPutAuthUserPwdProps {
  user_id: string
  old_password: string
  password: string
}

export const putAuthUserProfile = (props: IPutAuthUserProfileProps): AxiosPromise<IResponse> => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/user/${props.user_id}?type=profile`,
    headers: headerAuth,
    data: {
      first_name: props.first_name,
      last_name: props.last_name,
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

export const putAuthUserPwd = (props: IPutAuthUserPwdProps): AxiosPromise<IResponse> => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/user/${props.user_id}?type=password`,
    headers: headerAuth,
    data: {
      old_password: props.old_password,
      password: props.password,
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
