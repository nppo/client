import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/models'

export const state = () => ({
  all: [] as Product[],
  current: {} as Product,
})

export type ProductsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Product[]) {
    state.all = newValue
  },
  setCurrent(state, product: Product) {
    state.current = product
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

    async fetchCurrent({ commit }, id: number): Promise<void> {
      const { status, data } = await this.$repositories.product.show(id)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },

    async update({ commit }, product: Product): Promise<void> {
      const { status, data } = await this.$repositories.product.update(product)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
