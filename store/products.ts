import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Vue } from 'nuxt-property-decorator'
import { Product } from '~/types/entities'

export const state = () => ({
  all: [] as Product[],
})

export type ProductsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Product[]) {
    state.all = newValue
  },
  setItem(state, product: Product) {
    Vue.set(state.all, product.id, product)
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
    async fetchItem({ commit }, id: number): Promise<void> {
      const { status, data } = await this.$repositories.product.show(id)

      if (status === 200) {
        commit('setItem', data.data)
      }
    },
  }
)
