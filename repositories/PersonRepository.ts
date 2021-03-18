import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Person, Product } from '~/types/models'
import { MultipleResults, SingleResult } from '~/types/repositories'

const resource = 'people'

export default class PeopleRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Person>>> {
    return this.axios.get(`/api/${resource}`)
  }

  show(id: number): Promise<AxiosResponse<SingleResult<Person>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(
    id: number,
    data: FormData
  ): Promise<AxiosResponse<SingleResult<Person>>> {
    // Needed as Laravel otherwise does not allow uploading of images
    data.set('_method', 'PUT')
    return this.axios.post(`/api/${resource}/${id}`, data)
  }

  products(id: number): Promise<AxiosResponse<MultipleResults<Product>>> {
    return this.axios.get(`/api/${resource}/${id}/products`)
  }
}
