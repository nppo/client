import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Product } from '~/types/models'
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

  show(id: string): Promise<AxiosResponse<SingleResult<Product>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(
    id: string,
    data: FormData
  ): Promise<AxiosResponse<SingleResult<Product>>> {
    // Needed as Laravel otherwise does not allow uploading of images
    data.set('_method', 'PUT')
    return this.axios.post(`/api/${resource}/${id}`, data)
  }

  store(data: FormData): Promise<AxiosResponse<SingleResult<Product>>> {
    return this.axios.post(`/api/${resource}`, data)
  }

  delete(id: string): Promise<AxiosResponse> {
    return this.axios.delete(`api/${resource}/${id}`)
  }
}
