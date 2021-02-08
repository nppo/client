import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/entities'

export const state = () => ({
  all: [] as Product[],
  current: {} as Product,
})

export type ProductsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Product[]) {
    state.all = newValue
  },

  setCurrent(state, newValue: Product) {
    state.current = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.product.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      } else {
        // TODO:
      }
    },

    async search({ commit }, searchString): Promise<void> {
      const res = await this.$repositories.product.search(searchString)
      const { status, data } = res

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
