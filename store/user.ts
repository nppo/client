import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Product, User } from '~/types/models'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'
import {
  DeleteAction,
  FetchAction,
  PaginatedIndexAction,
  UpdateAction,
} from '~/types/requests'

export const state = () => ({
  current: {} as User,
  all: {
    items: [] as User[],
    meta: {} as any,
  },
  show: {} as User,
  products: [] as Product[],
})

export type UserState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: UserState, users: User[]) {
    state.all.items = users
  },
  appendAll(state, users: User[]): void {
    state.all.items = [...state.all.items, ...users]
  },
  setMeta(state: UserState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: UserState, user: User): void {
    state.show = user
  },
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

    index(
      { commit },
      {
        mutation = 'setAll',
        page = 1,
        perPage = 15,
        filters = [],
        sorts = [],
      }: PaginatedIndexAction<typeof mutations>
    ): Promise<User[]> {
      return this.$repositories.user
        .all({ page, sorts, filters, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<User>>) => {
          commit('setMeta', response.data.meta)

          if (mutation) {
            commit(mutation, response.data.data)
          }

          return response.data.data
        })
    },

    fetch(
      { commit },
      { id, mutation = 'setShow' }: FetchAction<typeof mutations>
    ): Promise<User> {
      return this.$repositories.user
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<User>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
        .catch((error: AxiosError): any => {
          if (error.response?.status === 422) {
            throw error.response.data.errors
          }

          throw error
        })
    },

    update(
      { commit },
      { id, data, mutation = 'setShow' }: UpdateAction<typeof mutations>
    ): Promise<User> {
      return this.$repositories.user
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<User>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
        .catch((error: AxiosError): any => {
          if (error.response?.status === 422) {
            throw error.response.data.errors
          }

          throw error
        })
    },

    delete(
      { commit },
      { id, mutation = null }: DeleteAction<typeof mutations>
    ): Promise<User> {
      return this.$repositories.user
        .delete(String(id))
        .then((response: AxiosResponse<SingleResult<User>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
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
