import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Project } from '~/types/models'

export const state = () => ({
  current: {} as Project,
})

export type ProjectsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, project: Project) {
    state.current = project
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchCurrent({ commit }, id: number): Promise<void> {
      const { status, data } = await this.$repositories.project.show(id)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },

    async update({ commit }, project: Project): Promise<void> {
      const { status, data } = await this.$repositories.project.update(project)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
