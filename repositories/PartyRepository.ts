import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Party } from '~/types/entities'
import { MultipleResults, SingleResult } from '~/types/repositories'

const resource = 'parties'

export default class PartyRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Party>>> {
    return this.axios.get(`/api/${resource}`)
  }

  show(id: number): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }
}
