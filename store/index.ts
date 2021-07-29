import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as products from '~/store/products'
import * as themes from '~/store/themes'
import * as search from '~/store/search'
import * as types from '~/store/types'
import * as errors from '~/store/errors'
import * as parties from '~/store/parties'
import * as user from '~/store/user'
import * as discover from '~/store/discover'
import * as people from '~/store/people'
import * as projects from '~/store/projects'
import * as articles from '~/store/articles'
import * as skills from '~/store/skills'
import * as likes from '~/store/likes'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const accessorType = getAccessorType({
  state,
  modules: {
    products,
    themes,
    search,
    types,
    errors,
    parties,
    user,
    discover,
    people,
    projects,
    articles,
    skills,
    likes,
  },
})
