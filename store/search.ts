import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Filter, Search } from '~/types/entities'

export const state = () => ({
  current: localStorage.getItem('currentSearch')
    ? (JSON.parse(<string>localStorage.getItem('currentSearch')) as Search)
    : ({} as Search),
  filters: {} as any,
})

export type SearchState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: Search) {
    state.current = newValue
  },
  setFilter(state, filter: Filter) {
    state.filters[filter.type] = filter.values
  },
  toggleFilter(state, filter: any) {
    if (state.filters[filter.type]) {
      const indexOf = state.filters[filter.type].indexOf(filter.value)

      if (indexOf >= 0) {
        state.filters[filter.type].splice(indexOf, 1)
        return
      }

      state.filters[filter.type].push(filter.value)
      return
    }

    state.filters[filter.type] = [filter.value]
  },
  reset(state) {
    state.filters = {} as any
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async result({ commit }, searchString): Promise<void> {
      const {
        status,
        data: { data },
      } = await this.$repositories.search.result(searchString)

      if (status === 200) {
        commit('setCurrent', data)
        localStorage.setItem('currentSearch', JSON.stringify(data as Search))
      }
    },

    setFilter({ commit }, data: Filter): void {
      commit('setFilter', data)
    },

    resetSearch({ commit }): void {
      commit('reset')
    },
  }
)
