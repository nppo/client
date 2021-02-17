import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Search } from '~/types/entities'
import { SingleResult } from '~/types/repositories'

export default class ProductRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  result(searchString: string): Promise<AxiosResponse<SingleResult<Search>>> {
    return this.axios.get(`/api/search?${searchString}`)
  }
}
