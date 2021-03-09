import { Context, Plugin } from '@nuxt/types'
import Vue from 'vue'
import { Inject } from '@nuxt/types/app'
import VueGates from 'vue-gates'

Vue.use(VueGates)

const plugin: Plugin = (_context: Context, inject: Inject) => {
  inject('gates', Vue.prototype.$gates)
}

export default plugin
