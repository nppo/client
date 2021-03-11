import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Tag } from '~/types/entities'

export const state = () => ({
  all: [] as Tag[],
})

export type TagsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Tag[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.tag.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
