import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Party } from '~/types/entities'

export const state = () => ({
  all: [] as Party[],
})

export type PartiesState = ReturnType<typeof state>

export const getters = getterTree(state, {
  firstFive: (state) => state.all.slice(0, 5),
})

export const mutations = mutationTree(state, {
  setAll(state, newValue: Party[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.party.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
