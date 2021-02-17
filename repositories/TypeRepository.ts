import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Type } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'types'

export default class TypeRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Type>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
