import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Person } from '~/types/entities'

export const state = () => ({
  all: [] as Person[],
})

export type PersonsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Person[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.person.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
