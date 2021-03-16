import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ProductTypeRepository from './ProductTypeRepository'
import StatisticsRepository from '~/repositories/StatisticsRepository'
import DiscoverRepository from '~/repositories/DiscoverRepository'
import ProductRepository from '~/repositories/ProductRepository'
import ProjectRepository from '~/repositories/ProjectRepository'
import PersonRepository from '~/repositories/PersonRepository'
import SearchRepository from '~/repositories/SearchRepository'
import ThemeRepository from '~/repositories/ThemeRepository'
import PartyRepository from '~/repositories/PartyRepository'
import TypeRepository from '~/repositories/TypeRepository'
import SkillRepository from '~/repositories/SkillRepository'
import TagRepository from '~/repositories/TagRepository'

export default class Repositories {
  statistics: StatisticsRepository
  discover: DiscoverRepository
  product: ProductRepository
  project: ProjectRepository
  person: PersonRepository
  search: SearchRepository
  theme: ThemeRepository
  party: PartyRepository
  type: TypeRepository
  skill: SkillRepository
  productTypes: ProductTypeRepository
  tags: TagRepository

  constructor($axios: NuxtAxiosInstance) {
    this.statistics = new StatisticsRepository($axios)
    this.discover = new DiscoverRepository($axios)
    this.product = new ProductRepository($axios)
    this.project = new ProjectRepository($axios)
    this.person = new PersonRepository($axios)
    this.search = new SearchRepository($axios)
    this.theme = new ThemeRepository($axios)
    this.party = new PartyRepository($axios)
    this.type = new TypeRepository($axios)
    this.skill = new SkillRepository($axios)
    this.productTypes = new ProductTypeRepository($axios)
    this.tags = new TagRepository($axios)
  }
}
