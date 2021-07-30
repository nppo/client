import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Tag } from '~/types/models'
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
    items: [] as Tag[],
    meta: {} as any,
  },
  show: {} as Tag,
})

export type TagsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: TagsState, themes: Tag[]): void {
    state.all.items = themes
  },
  appendAll(state: TagsState, themes: Tag[]): void {
    state.all.items = [...state.all.items, ...themes]
  },
  setMeta(state: TagsState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: TagsState, theme: Tag): void {
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
    ): Promise<Tag[]> {
      return this.$repositories.tag
        .all({ page, sorts, filters, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Tag>>) => {
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
    ): Promise<Tag> {
      return this.$repositories.tag
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<Tag>>) => {
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
    ): Promise<Tag> {
      return this.$repositories.tag
        .store(data)
        .then((response: AxiosResponse<SingleResult<Tag>>) => {
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
    ): Promise<Tag> {
      return this.$repositories.tag
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<Tag>>) => {
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
    ): Promise<Tag> {
      return this.$repositories.tag
        .delete(String(id))
        .then((response: AxiosResponse<SingleResult<Tag>>) => {
          if (mutation) {
            commit('setShow', response.data.data)
          }

          return response.data.data
        })
    },
  }
)
