import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Theme } from '~/types/models'
import {
  PaginateMeta,
  MultipleResultsWithMeta,
  SingleResult,
  IndexRequest,
} from '~/types/repositories'

const resource = 'themes'

export default class ThemeRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(
    request: IndexRequest = { page: 1, perPage: 10 }
  ): Promise<AxiosResponse<MultipleResultsWithMeta<Theme, PaginateMeta>>> {
    return this.axios.get(`/api/${resource}?page=${request.page}`)
  }

  store(data: Object | FormData): Promise<AxiosResponse<SingleResult<Theme>>> {
    return this.axios.post(`api/${resource}`, data)
  }
}
