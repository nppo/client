import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { User } from '~/types/models'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'
import {
  DeleteAction,
  FetchAction,
  PaginatedIndexAction,
  StoreAction,
  UpdateAction,
} from '~/types/requests'

export const state = () => ({
  all: {
    items: [] as User[],
    meta: {} as any,
  },
  show: {} as User,
})

export type UserState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: UserState, users: User[]) {
    state.all.items = users
  },
  appendAll(state: UserState, users: User[]): void {
    state.all.items = [...state.all.items, ...users]
  },
  setMeta(state: UserState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: UserState, user: User): void {
    state.show = user
  },
})

export const actions = actionTree(
  { state, mutations },
  {
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

    create(
      { commit },
      { data, mutation = 'setShow' }: StoreAction<typeof mutations>
    ): Promise<User> {
      return this.$repositories.user
        .store(data)
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
  }
)
