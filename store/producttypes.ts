import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Type } from '~/types/entities'

export const state = () => ({
  all: localStorage.getItem('producttypes')
    ? (JSON.parse(<string>localStorage.getItem('producttypes')) as Type[])
    : ([] as Type[]),
})

export type ProductTypesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, types: Type[]) {
    state.all = types
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.producttypes.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
        localStorage.setItem(
          'producttypes',
          JSON.stringify(data.data as Type[])
        )
      }
    },
  }
)
