import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Theme } from '~/types/models'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'
import {
  FetchAction,
  PaginatedIndexAction,
  StoreAction,
  UpdateAction,
} from '~/types/requests'

export const state = () => ({
  all: {
    items: [] as Theme[],
    meta: {} as any,
  },
  show: {} as Theme,
})

export type ThemesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: ThemesState, themes: Theme[]): void {
    state.all.items = themes
  },
  appendAll(state: ThemesState, themes: Theme[]): void {
    state.all.items = [...state.all.items, ...themes]
  },
  setMeta(state: ThemesState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: ThemesState, theme: Theme): void {
    state.show = theme
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    fetchIndex(
      { commit },
      {
        mutation = 'setAll',
        page = 1,
        perPage = 15,
        filters = [],
        sorts = [],
      }: PaginatedIndexAction<typeof mutations>
    ): Promise<Theme[]> {
      return this.$repositories.theme
        .all({ page, filters, sorts, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Theme>>) => {
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
    ): Promise<Theme> {
      return this.$repositories.theme
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<Theme>>) => {
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
    ): Promise<Theme> {
      return this.$repositories.theme
        .store(data)
        .then((response: AxiosResponse<SingleResult<Theme>>) => {
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
    ): Promise<Theme> {
      return this.$repositories.theme
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<Theme>>) => {
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
  }
)
