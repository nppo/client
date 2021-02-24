import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Project } from '~/types/entities'

export const state = () => ({
  all: [] as Project[],
})

export type ProjectsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Project[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.project.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
