import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Product } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'products'

export default class ProductRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  result(
    searchString: string
  ): Promise<AxiosResponse<MultipleResults<Product>>> {
    return this.axios.get(`/api/${resource}/search?query=${searchString}`)
  }
}
