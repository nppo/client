import { AxiosResponse } from 'axios'
import AbstractRepository from './AbstractRepository'
import { Skill } from '~/types/models'
import {
  PaginateMeta,
  MultipleResultsWithMeta,
  SingleResult,
  IndexRequest,
} from '~/types/repositories'

const resource = 'skills'

export default class SkillRepository extends AbstractRepository {
  index({
    page = 1,
    perPage = 15,
    filters = [],
    sorts = [],
  }: IndexRequest): Promise<
    AxiosResponse<MultipleResultsWithMeta<Skill, PaginateMeta>>
  > {
    return this.axios.get(
      `/api/${resource}?${this.allToQuery(page, perPage, filters, sorts)}`
    )
  }

  fetch(id: string): Promise<AxiosResponse<SingleResult<Skill>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  store(data: Object | FormData): Promise<AxiosResponse<SingleResult<Skill>>> {
    return this.axios.post(`api/${resource}`, data)
  }

  update(
    id: string,
    data: Object | FormData
  ): Promise<AxiosResponse<SingleResult<Skill>>> {
    return this.axios.post(`api/${resource}/${id}`, {
      ...data,
      _method: 'PUT',
    })
  }
}
