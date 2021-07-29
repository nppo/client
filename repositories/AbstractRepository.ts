import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { SortBy, SortByDirection } from '~/types/entities'
import { Filter } from '~/types/repositories'

export default abstract class AbstractRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  sortByObjectToQueryValue(field: string, direction: SortByDirection): string {
    const prefix: string = direction === 'desc' ? '-' : ''

    return `${prefix}${field}`
  }

  allToQuery(
    page: number,
    perPage: number,
    filters: Array<Filter> = [],
    sorts: Array<SortBy> = []
  ): string {
    const query = new URLSearchParams()

    query.append('page', String(page))
    query.append('perPage', String(perPage))

    filters.forEach((filter: Filter) => {
      query.append(`filter[${filter.key}]`, String(filter.value))
    })

    if (sorts.length > 0) {
      query.append(
        `sort`,
        sorts
          .map(({ field, direction }: SortBy): string =>
            this.sortByObjectToQueryValue(field, direction)
          )
          .join(',')
      )
    }

    return query.toString()
  }
}
