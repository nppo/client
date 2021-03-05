import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { User } from '~/types/entities'

export const state = () => ({
  current: {} as User,
})

export type UserState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, user: User) {
    state.current = user
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchCurrent({ commit, dispatch }): Promise<void> {
      if (!this.$auth.loggedIn) {
        return
      }

      const {
        status,
        data: { data },
      } = await this.$repositories.user.current()

      if (status !== 200) {
        return
      }

      commit('setCurrent', data)

      if (
        typeof data.roles !== 'undefined' &&
        typeof data.permissions !== 'undefined'
      ) {
        dispatch('setPermissions')
      }
    },

    setPermissions({ state }): void {
      this.$gates.setRoles(state.current.roles?.map(({ name }) => name) || [])
      this.$gates.setPermissions(
        state.current.permissions?.map(({ name }) => name) || []
      )
    },
  }
)
