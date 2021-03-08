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
    setPermissions({ commit }): void {
      if (!this.$auth.loggedIn) {
        return
      }

      if (this.$auth.user === null) {
        return
      }

      const user: User = (this.$auth.user as unknown) as User
      commit('setCurrent', user)

      if (
        typeof user.roles === 'undefined' ||
        typeof user.permissions === 'undefined'
      ) {
        return
      }

      this.$gates.setRoles(user.roles.map(({ name }) => name) || [])
      this.$gates.setPermissions(user.permissions.map(({ name }) => name) || [])
    },
  }
)
