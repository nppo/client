import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Type } from '~/types/entities'

export const state = () => ({
  all: localStorage.getItem('types')
    ? (JSON.parse(<string>localStorage.getItem('types')) as Type[])
    : ([] as Type[]),
})

export type TypeState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, types: Type[]) {
    state.all = types
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.type.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
        localStorage.setItem('types', JSON.stringify(data.data as Type[]))
      }
    },
  }
)
