import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { Theme } from '~/types/models'
import {
  PaginateMeta,
  MultipleResultsWithMeta,
  SingleResult,
  IndexRequest,
} from '~/types/repositories'

const resource = 'themes'

export default class ThemeRepository extends AbstractRepository {
  all({
    page = 1,
    perPage = 10,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<Theme, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }

  fetch(id: string): Promise<AxiosResponse<SingleResult<Theme>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  store(data: Object | FormData): Promise<AxiosResponse<SingleResult<Theme>>> {
    return this.axios.post(`api/${resource}`, data)
  }

  update(
    id: string,
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<Theme>>> {
    return this.axios.post(`api/${resource}/${id}`, {
      ...data,
      _method: 'PUT',
    })
  }
}
