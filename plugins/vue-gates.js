// TYPESCRIPT - START
// import { Context, Plugin } from '@nuxt/types';
// import { Inject } from '@nuxt/types/app';
// import Vue from 'vue'
// import VueGates from 'vue-gates'

// Vue.use(VueGates)

// const plugin: Plugin = (_context: Context, inject: Inject) => {
//     inject('gates', Vue.prototype.$gates)
// }

// export default plugin
// TYPESCRIPT - END

import Vue from 'vue'
import VueGates from 'vue-gates'

Vue.use(VueGates)

export default (_context, inject) => {
  inject('gates', Vue.prototype.$gates)
}
