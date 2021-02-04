import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Product } from '~/types/entities'

export const state = () => ({
  all: [] as Product[],
})

export type ProductsState = ReturnType<typeof state>

export const getters = getterTree(state, {
  filter: (state) => (searchString: string) => {
    if (searchString === '') {
      return state.all.slice(0, 6)
    }

    return state.all.filter((product) => {
      return product.name.toLowerCase().includes(searchString.toLowerCase())
    })
  },
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
      } else {
        // TODO:
      }
    },
  }
)
