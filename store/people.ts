import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Person } from '~/types/models'

export const state = () => ({
  all: [] as Person[],
  current: {} as Person,
})

export type PeopleState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Person[]) {
    state.all = newValue
  },

  setCurrent(state, person: Person) {
    state.current = person
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
      }
    },

    async fetchCurrent({ commit }, id: number): Promise<void> {
      const { status, data } = await this.$repositories.person.show(id)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },

    async update({ commit }, person: Person): Promise<void> {
      const { status, data } = await this.$repositories.person.update(person)

      if (status === 200) {
        commit('setCurrent', data.data)
      }
    },
  }
)
