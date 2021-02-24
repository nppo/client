import { actionTree, mutationTree, getterTree } from 'nuxt-typed-vuex'
import { Person } from '~/types/entities'

export const state = () => ({
  all: localStorage.getItem('persons')
    ? (JSON.parse(<string>localStorage.getItem('persons')) as Person[])
    : ([] as Person[]),
})

export type PersonsState = ReturnType<typeof state>

export const getters = getterTree(state, {
  firstTen: (state) => state.all.slice(0, 10),
})

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
        localStorage.setItem('persons', JSON.stringify(data.data as Person[]))
      }
    },
  }
)
