import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Product, Filter } from '~/types/entities'

export const state = () => ({
  current: localStorage.getItem('currentSearch')
    ? (JSON.parse(<string>localStorage.getItem('currentSearch')) as Product[])
    : ({} as Product[]),
  filters: {} as any,
  isLoading: false,
})

export type SearchState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: Product[]) {
    state.current = newValue
  },
  setFilter(state, filter: Filter) {
    state.filters[filter.type] = filter.values
  },
  setLoading(state, isLoading: boolean) {
    state.isLoading = isLoading
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async result({ commit }, searchString): Promise<void> {
      commit('setLoading', true)

      const {
        status,
        data: { data },
      } = await this.$repositories.search.result(searchString)

      if (status === 200) {
        commit('setCurrent', data)
        localStorage.setItem('currentSearch', JSON.stringify(data as Product[]))
      }

      commit('setLoading', false)
    },

    setFilter({ commit }, data: Filter): void {
      commit('setFilter', data)
    },
  }
)
