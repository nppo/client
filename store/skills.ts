import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse, AxiosError } from 'axios'
import { Skill } from '~/types/models'
import { MultipleResultsWithMeta, SingleResult } from '~/types/repositories'
import {
  FetchAction,
  PaginatedIndexAction,
  StoreAction,
  UpdateAction,
} from '~/types/requests'

export const state = () => ({
  all: {
    items: [] as Skill[],
    meta: {} as any,
  },
  show: {} as Skill,
})

export type SkillsState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: SkillsState, skills: Skill[]): void {
    state.all.items = skills
  },
  appendAll(state: SkillsState, skills: Skill[]): void {
    state.all.items = [...state.all.items, ...skills]
  },
  setMeta(state: SkillsState, meta: any): void {
    state.all.meta = meta
  },
  setShow(state: SkillsState, skill: Skill): void {
    state.show = skill
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
    ): Promise<Skill[]> {
      return this.$repositories.skill
        .index({ page, filters, sorts, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Skill>>) => {
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
    ): Promise<Skill> {
      return this.$repositories.skill
        .fetch(String(id))
        .then((response: AxiosResponse<SingleResult<Skill>>) => {
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
    ): Promise<Skill> {
      return this.$repositories.skill
        .store(data)
        .then((response: AxiosResponse<SingleResult<Skill>>) => {
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
    ): Promise<Skill> {
      return this.$repositories.skill
        .update(String(id), data)
        .then((response: AxiosResponse<SingleResult<Skill>>) => {
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
