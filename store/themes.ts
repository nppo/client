import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Theme } from '~/types/models'

export const state = () => ({
  all: [] as Theme[],
})

export type ThemesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Theme[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.theme.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
