import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Project } from '~/types/entities'

export const state = () => ({
  all: localStorage.getItem('projects')
    ? (JSON.parse(<string>localStorage.getItem('projects')) as Project[])
    : ([] as Project[]),
})

export type ProjectsState = ReturnType<typeof state>

export const getters = getterTree(state, {
  firstTen: (state) => state.all.slice(0, 10),
})

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
        localStorage.setItem('projects', JSON.stringify(data.data as Project[]))
      }
    },
  }
)
