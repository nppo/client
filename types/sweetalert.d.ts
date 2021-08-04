/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

declare module 'vue/types/vue' {
  interface Vue {
    $swal: typeof Swal
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$swal inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $swal: typeof Swal
  }
  // nuxtContext.$swal
  interface Context {
    $swal: typeof Swal
  }
}
