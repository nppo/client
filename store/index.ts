import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as products from '~/store/products'
import * as themes from '~/store/themes'
import * as search from '~/store/search'
import * as types from '~/store/types'
import * as errors from '~/store/errors'
import * as parties from '~/store/parties'

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
  },
})
