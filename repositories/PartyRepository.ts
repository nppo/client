import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { Party } from '~/types/models'
import {
  IndexRequest,
  MultipleResultsWithMeta,
  PaginateMeta,
  SingleResult,
} from '~/types/repositories'

const resource = 'parties'

export default class PartyRepository extends AbstractRepository {
  all({
    page = 1,
    perPage = 15,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<Party, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }

  fetch(id: string): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  store(data: Object | FormData): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.post(`api/${resource}`, data)
  }

  show(id: string): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(
    id: string,
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.post(`api/${resource}/${id}`, {
      ...data,
      _method: 'PUT',
    })
  }

  delete(id: string): Promise<AxiosResponse<SingleResult<Party>>> {
    return this.axios.delete(`/api/${resource}/${id}`)
  }
}
