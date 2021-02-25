import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Discover } from '~/types/entities'
import { SingleResult } from '~/types/repositories'

const resource = 'discover'

export default class DiscoverRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<SingleResult<Discover>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
