import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IPutUserRoleProps {
  user_id: string
  role_id: string
}

export const putUserRole = (props: IPutUserRoleProps): AxiosPromise<IResponse> => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/user/${props.user_id}/role`,
    headers: headerAuth,
    data: {
      role_id: props.role_id,
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
