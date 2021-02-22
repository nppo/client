import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ProductRepository from '~/repositories/ProductRepository'
import SearchRepository from '~/repositories/SearchRepository'
import ThemeRepository from '~/repositories/ThemeRepository'
import TypeRepository from '~/repositories/TypeRepository'
import PersonRepository from '~/repositories/PersonRepository'
import PartyRepository from '~/repositories/PartyRepository'

export default class Repositories {
  product: ProductRepository
  search: SearchRepository
  theme: ThemeRepository
  type: TypeRepository
  person: PersonRepository
  party: PartyRepository

  constructor($axios: NuxtAxiosInstance) {
    this.product = new ProductRepository($axios)
    this.search = new SearchRepository($axios)
    this.theme = new ThemeRepository($axios)
    this.type = new TypeRepository($axios)
    this.person = new PersonRepository($axios)
    this.party = new PartyRepository($axios)
  }
}
