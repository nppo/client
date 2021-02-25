import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Discover } from '~/types/entities'

export const state = () => ({
  all: {} as Discover,
})

export type DiscoverState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Discover) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const {
        status,
        data: { data },
      } = await this.$repositories.discover.all()

      if (status === 200) {
        commit('setAll', data)
      }
    },
  }
)
