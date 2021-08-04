import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { AxiosResponse } from 'axios'
import { Role } from '~/types/models'
import { MultipleResultsWithMeta } from '~/types/repositories'
import { PaginatedIndexAction } from '~/types/requests'

export const state = () => ({
  all: {
    items: [] as Role[],
    meta: {} as any,
  },
})

export type RoleState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state: RoleState, roles: Role[]) {
    state.all.items = roles
  },
  appendAll(state: RoleState, roles: Role[]): void {
    state.all.items = [...state.all.items, ...roles]
  },
  setMeta(state: RoleState, meta: any): void {
    state.all.meta = meta
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
    ): Promise<Role[]> {
      return this.$repositories.role
        .all({ page, sorts, filters, perPage })
        .then((response: AxiosResponse<MultipleResultsWithMeta<Role>>) => {
          commit('setMeta', response.data.meta)

          if (mutation) {
            commit(mutation, response.data.data)
          }

          return response.data.data
        })
    },
  }
)
