import { Plugin } from '@nuxt/types'
import * as Rules from '~/config/Rules'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const permissions: Plugin = (context, inject) => {
  inject('rules', Rules.default)
}

export default permissions
