/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import { SortBy } from './entities'
import Repositories from '~/repositories/Repositories'

interface MultipleResults<T = any> {
  data: T[]
}

interface PaginateMeta {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
}

interface MultipleResultsWithMeta<
  DataType = any,
  MetaType = PaginateMeta | any
> {
  data: DataType[]
  meta: MetaType
}
interface Filter {
  key: string
  value: any | any[]
}

interface ValidationErrors {
  [key: string]: Array<string>
}

interface IndexRequest {
  filters?: Filter[]
  sorts?: SortBy[]
  page?: number
  perPage?: number
}

interface Filter {
  key: string
  value: any | any[]
}

interface ValidationErrors {
  [key: string]: Array<string>
}

interface IndexRequest {
  filters?: Filter[]
  sorts?: SortBy[]
  page?: number
  perPage?: number
}

interface SingleResult<T = any> {
  data: T
}

declare module 'vue/types/vue' {
  interface Vue {
    $repositories: Repositories
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$repositories inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $repositories: Repositories
  }
  // nuxtContext.$repositories
  interface Context {
    $repositories: Repositories
  }
}

declare module 'vuex/types/index' {
  // this.$repositories inside Vuex stores
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $repositories: Repositories
  }
}
