import { Plugin } from '@nuxt/types'
import Repositories from '~/repositories/Repositories'

const repositories: Plugin = (context, inject) => {
  inject('repositories', new Repositories(context.$axios))
}

export default repositories
