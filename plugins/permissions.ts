import { Plugin } from '@nuxt/types'
import * as Permissions from '~/config/Permissions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const permissions: Plugin = (context, inject) => {
  inject('permissions', Permissions.default)
}

export default permissions
