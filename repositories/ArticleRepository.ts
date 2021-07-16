import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Article } from '~/types/models'
import { SingleResult } from '~/types/repositories'

const resource = 'articles'

export default class ArticleRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  show(id: number): Promise<AxiosResponse<SingleResult<Article>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }
}
