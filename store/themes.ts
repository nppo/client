import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Theme } from '~/types/models'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'
import { PaginatedIndexAction, StoreAction } from '~/types/requests'

export const state = () => ({
  all: {
    items: [] as Theme[],
    meta: {} as any,
  },
  show: {} as Theme,
})

export type ThemesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  allSet(state: ThemesState, results: Theme[]): void {
    state.all.items = results
  },
  allAppend(state: ThemesState, results: Theme[]): void {
    state.all.items = [...state.all.items, ...results]
  },
  metaSet(state: ThemesState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: ThemesState, theme: Theme): void {
    state.show = theme
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const res = await this.$repositories.theme.all()
      const { status, data } = res

      if (status === 200) {
        commit('allSet', data.data)
      }
    },

    index(
      { commit },
      { mutation = 'allSet', page = 1 }: PaginatedIndexAction<typeof mutations>
    ): Promise<Theme[]> {
      return this.$repositories.theme
        .all({ page })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Theme>>) => {
          commit('metaSet', response.data.meta)

          if (mutation) {
            commit(mutation, response.data.data)
          }

          return response.data.data
        })
    },

    store(
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
  }
)
