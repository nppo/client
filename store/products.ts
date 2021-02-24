import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/entities'

export const state = () => ({
  all: localStorage.getItem('products')
    ? (JSON.parse(<string>localStorage.getItem('products')) as Product[])
    : ([] as Product[]),
})

export type ProductsState = ReturnType<typeof state>

export const getters = getterTree(state, {
  firstTen: (state) => state.all.slice(0, 10),
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
        localStorage.setItem('products', JSON.stringify(data.data as Product[]))
      }
    },
  }
)
