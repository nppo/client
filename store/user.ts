import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Product, User } from '~/types/models'

export const state = () => ({
  current: {} as User,
  products: [] as Product[],
})

export type UserState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, user: User) {
    state.current = user
  },
  setProducts(state, products: Product[]) {
    state.products = products
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    setPermissions({ commit }): void {
      if (!this.$auth.loggedIn) {
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

    async fetchProducts({ commit }, id: string): Promise<void> {
      const {
        status,
        data: { data },
      } = await this.$repositories.person.products(id)

      if (status === 200) {
        commit('setProducts', data)
      }
    },
  }
)
