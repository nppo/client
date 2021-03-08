import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Tag } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'tags'

export default class TagRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Tag>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
