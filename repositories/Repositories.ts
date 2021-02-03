import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ProductRepository from '~/repositories/ProductRepository'

export default class Repositories {
  product: ProductRepository

  constructor($axios: NuxtAxiosInstance) {
    this.product = new ProductRepository($axios)
  }
}
