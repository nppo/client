import { getAccessorType } from 'typed-vuex'

// Import all your submodules
import * as products from '~/store/products'
import * as errors from '~/store/errors'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const accessorType = getAccessorType({
  state,
  modules: {
    products,
    errors,
  },
})
