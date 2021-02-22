import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Person } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'persons'

export default class PersonRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Person>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
