/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import * as ActualPermissions from '~/config/Permissions'

declare module 'vue/types/vue' {
  interface Vue {
    $permissions: typeof ActualPermissions.default
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$permissions inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $permissions: typeof ActualPermissions.default
  }
  // nuxtContext.$permissions
  interface Context {
    $permissions: typeof ActualPermissions.default
  }
}
