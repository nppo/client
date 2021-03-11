import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Party } from '~/types/models'

export const state = () => ({
  all: [] as Party[],
  current: {} as Party,
})

export type PartiesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Party[]) {
    state.all = newValue
  },
  setCurrent(state, person: Party) {
    state.current = person
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
    async fetchCurrent({ commit }, id: number): Promise<void> {
      const { status, data } = await this.$repositories.party.show(id)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
