import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Theme } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'themes'

export default class ThemeRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Theme>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
