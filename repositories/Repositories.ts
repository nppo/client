import { NuxtAxiosInstance } from '@nuxtjs/axios'
import StatisticsRepository from '~/repositories/StatisticsRepository'
import ProductRepository from '~/repositories/ProductRepository'
import SearchRepository from '~/repositories/SearchRepository'
import ThemeRepository from '~/repositories/ThemeRepository'
import TypeRepository from '~/repositories/TypeRepository'
import DiscoverRepository from '~/repositories/DiscoverRepository'

export default class Repositories {
  statistics: StatisticsRepository
  product: ProductRepository
  search: SearchRepository
  theme: ThemeRepository
  type: TypeRepository
  discover: DiscoverRepository

  constructor($axios: NuxtAxiosInstance) {
    this.statistics = new StatisticsRepository($axios)
    this.product = new ProductRepository($axios)
    this.search = new SearchRepository($axios)
    this.theme = new ThemeRepository($axios)
    this.type = new TypeRepository($axios)
    this.discover = new DiscoverRepository($axios)
  }
}
