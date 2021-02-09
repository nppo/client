import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ProductRepository from '~/repositories/ProductRepository'
import SearchRepository from '~/repositories/SearchRepository'

export default class Repositories {
  product: ProductRepository
  search: SearchRepository

  constructor($axios: NuxtAxiosInstance) {
    this.product = new ProductRepository($axios)
    this.search = new SearchRepository($axios)
  }
}
