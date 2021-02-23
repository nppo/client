import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { MultipleResults } from '~/types/repositories'

export default class StatisticsRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  entities(): Promise<AxiosResponse<MultipleResults<Object>>> {
    return this.axios.get('/api/entity-statistics')
  }
}
