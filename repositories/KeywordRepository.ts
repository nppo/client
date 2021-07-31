import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { Keyword } from '~/types/models'
import {
  IndexRequest,
  MultipleResultsWithMeta,
  PaginateMeta,
  SingleResult,
} from '~/types/repositories'

const resource = 'keywords'

export default class KeywordRepository extends AbstractRepository {
  all({
    page = 1,
    perPage = 15,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<Keyword, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }

  fetch(id: string): Promise<AxiosResponse<SingleResult<Keyword>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  store(
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<Keyword>>> {
    return this.axios.post(`api/${resource}`, data)
  }

  update(
    id: string,
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<Keyword>>> {
    return this.axios.post(`api/${resource}/${id}`, {
      ...data,
      _method: 'PUT',
    })
  }

  delete(id: string): Promise<AxiosResponse<SingleResult<Keyword>>> {
    return this.axios.delete(`/api/${resource}/${id}`)
  }
}
