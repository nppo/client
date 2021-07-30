import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { User } from '~/types/models'
import {
  IndexRequest,
  MultipleResultsWithMeta,
  PaginateMeta,
  SingleResult,
} from '~/types/repositories'

const resource = 'users'

export default class UserRepository extends AbstractRepository {
  all({
    page = 1,
    perPage = 15,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<User, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }

  fetch(id: string): Promise<AxiosResponse<SingleResult<User>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(
    id: string,
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<User>>> {
    return this.axios.post(`api/${resource}/${id}`, {
      ...data,
      _method: 'PUT',
    })
  }

  delete(id: string): Promise<AxiosResponse<SingleResult<User>>> {
    return this.axios.delete(`/api/${resource}/${id}`)
  }
}
