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

    async store({ commit }, createData: { data: FormData }): Promise<void> {
      const { status, data } = await this.$repositories.project.store(
        createData.data
      )

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },

    async update(
      { commit },
      updateData: { id: number; data: FormData }
    ): Promise<void> {
      const { status, data } = await this.$repositories.project.update(
        updateData.id,
        updateData.data
      )

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
