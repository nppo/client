import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Skill } from '~/types/entities'

export const state = () => ({
  all: [] as Skill[],
})

export type SkillsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Skill[]) {
    state.all = newValue
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.skill.all()
      const { status, data } = res

      if (status === 200) {
        commit('setAll', data.data)
      }
    },
  }
)
