import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/entities'

export const state = () => ({
  all: [] as Product[],
})

export type ProductsState = ReturnType<typeof state>

export const getters = getterTree(state, {
  firstFive: (state) => state.all.slice(0, 5),
})

export const mutations = mutationTree(state, {
  setAll(state, newValue: Product[]) {
    state.all = newValue
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
      }
    },
  }
)
