import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Party } from '~/types/models'
import {
  DeleteAction,
  FetchAction,
  PaginatedIndexAction,
  StoreAction,
  UpdateAction,
} from '~/types/requests'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'

export const state = () => ({
  all: {
    items: [] as Party[],
    meta: {} as any,
  },
  show: {} as Party,
})

export type PartiesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: PartiesState, themes: Party[]): void {
    state.all.items = themes
  },
  appendAll(state: PartiesState, themes: Party[]): void {
    state.all.items = [...state.all.items, ...themes]
  },
  setMeta(state: PartiesState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: PartiesState, theme: Party): void {
    state.show = theme
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
    ): Promise<Party[]> {
      return this.$repositories.party
        .all({ page, filters, sorts, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Party>>) => {
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
    ): Promise<Party> {
      return this.$repositories.party
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<Party>>) => {
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
    ): Promise<Party> {
      return this.$repositories.party
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<Party>>) => {
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

    store(
      { commit },
      { data, mutation = 'setShow' }: StoreAction<typeof mutations>
    ): Promise<Party> {
      return this.$repositories.party
        .store(data)
        .then((response: AxiosResponse<SingleResult<Party>>) => {
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
    ): Promise<Party> {
      return this.$repositories.party
        .delete(String(id))
        .then((response: AxiosResponse<SingleResult<Party>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
    },
  }
)
