/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import * as Rules from '~/config/Rules'

declare module 'vue/types/vue' {
  interface Vue {
    $rules: typeof Rules.default
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$rules inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $rules: typeof Rules.default
  }
  // nuxtContext.$rules
  interface Context {
    $rules: typeof Rules.default
  }
}
