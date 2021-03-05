import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { User } from '~/types/entities'
import { SingleResult } from '~/types/repositories'

const resource = 'users'

export default class UserRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  current(): Promise<AxiosResponse<SingleResult<User>>> {
    return this.axios.get(`/api/${resource}/current`)
  }
}
