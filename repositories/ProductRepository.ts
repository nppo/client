import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Product } from '~/types/entities'
import { MultipleResults, SingleResult } from '~/types/repositories'

const resource = 'products'

export default class ProductRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Product>>> {
    return this.axios.get(`/api/${resource}`)
  }

  show(id: number): Promise<AxiosResponse<SingleResult<Product>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(product: Product): Promise<AxiosResponse<SingleResult<Product>>> {
    return this.axios.put(`/api/${resource}/${product.id}`, product)
  }
}
