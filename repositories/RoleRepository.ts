import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { Role } from '~/types/models'
import {
  IndexRequest,
  MultipleResultsWithMeta,
  PaginateMeta,
} from '~/types/repositories'

const resource = 'roles'

export default class RoleRepository extends AbstractRepository {
  all({
    page = 1,
    perPage = 15,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<Role, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }
}
