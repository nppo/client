import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ProductRepository from '~/repositories/ProductRepository'
import SearchRepository from '~/repositories/SearchRepository'
import ThemeRepository from '~/repositories/ThemeRepository'

export default class Repositories {
  product: ProductRepository
  search: SearchRepository
  theme: ThemeRepository

  constructor($axios: NuxtAxiosInstance) {
    this.product = new ProductRepository($axios)
    this.search = new SearchRepository($axios)
    this.theme = new ThemeRepository($axios)
  }
}
