/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Repositories from '~/repositories/Repositories'

interface MultipleResults<T = any> {
  data: T[]
}

interface MultipleResultsWithMeta<DataType = any, MetaType = any> {
  data: DataType[]
  meta: MetaType
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
