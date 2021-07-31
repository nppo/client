import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Keyword } from '~/types/models'
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
    items: [] as Keyword[],
    meta: {} as any,
  },
  show: {} as Keyword,
})

export type KeywordsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: KeywordsState, keywords: Keyword[]): void {
    state.all.items = keywords
  },
  appendAll(state: KeywordsState, keywords: Keyword[]): void {
    state.all.items = [...state.all.items, ...keywords]
  },
  setMeta(state: KeywordsState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: KeywordsState, keyword: Keyword): void {
    state.show = keyword
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
    ): Promise<Keyword[]> {
      return this.$repositories.keyword
        .all({ page, sorts, filters, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Keyword>>) => {
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
    ): Promise<Keyword> {
      return this.$repositories.keyword
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<Keyword>>) => {
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
    ): Promise<Keyword> {
      return this.$repositories.keyword
        .store(data)
        .then((response: AxiosResponse<SingleResult<Keyword>>) => {
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
    ): Promise<Keyword> {
      return this.$repositories.keyword
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<Keyword>>) => {
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
    ): Promise<Keyword> {
      return this.$repositories.keyword
        .delete(String(id))
        .then((response: AxiosResponse<SingleResult<Keyword>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
    },
  }
)
