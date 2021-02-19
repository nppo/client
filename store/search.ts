import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Vue } from 'nuxt-property-decorator'
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
    Vue.set(state.filters, filter.type, filter.values)
  },
  toggleFilter(state, filter: any) {
    const filters = state.filters[filter.type]

    if (!filters) {
      Vue.set(state.filters, filter.type, [filter.value])

      return
    }

    const indexOf = filters.indexOf(filter.value)

    if (indexOf >= 0) {
      filters.splice(indexOf, 1)
    } else {
      filters.push(filter.value)
    }

    Vue.set(state.filters, filter.type, filters)
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
