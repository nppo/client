import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Filter, Search } from '~/types/entities'

export const state = () => ({
  current: localStorage.getItem('currentSearch')
    ? (JSON.parse(<string>localStorage.getItem('currentSearch')) as Search)
    : ({} as Search),
  filters: {} as any,
  isLoading: false,
})

export type SearchState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: Search) {
    state.current = newValue
  },
  setFilter(state, filter: Filter) {
    state.filters[filter.type] = filter.values
  },
  addFilter(state, filter: Filter) {
    state.filters[filter.type] = [
      ...state.filters[filter.type],
      ...filter.values,
    ]
  },
  toggleFilter(state, filter: any) {
    const indexOf = state.filters[filter.type].indexOf(filter.value)

    if (indexOf >= 0) {
      state.filters[filter.type].splice(indexOf, 1)
    } else {
      state.filters[filter.type] = [...state.filters[filter.type], filter.value]
    }
  },
  setLoading(state, isLoading: boolean) {
    state.isLoading = isLoading
  },
  reset(state) {
    state.filters = {} as any
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async result({ commit }, searchString): Promise<void> {
      commit('setLoading', true)

      const res = await this.$repositories.search.result(searchString)
      const { status, data } = res

      if (status === 200) {
        commit('setCurrent', data.data)
        localStorage.setItem(
          'currentSearch',
          JSON.stringify(data.data as Search)
        )
      }

      commit('setLoading', false)
    },

    setFilter({ commit }, data: Filter): void {
      commit('setFilter', data)
    },

    resetSearch({ commit }): void {
      commit('reset')
    },
  }
)
