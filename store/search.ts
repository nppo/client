import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/entities'

export const state = () => ({
  current: localStorage.getItem('currentSearch')
    ? (JSON.parse(<string>localStorage.getItem('currentSearch')) as Product)
    : ({} as Product),
})

export type ProductsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: Product) {
    state.current = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async result({ commit }, searchString): Promise<void> {
      const res = await this.$repositories.search.result(searchString)
      const { status, data } = res

      if (status === 200) {
        commit('setCurrent', data.data)
        localStorage.setItem(
          'currentSearch',
          JSON.stringify(data.data as Product)
        )
      }
    },
  }
)
