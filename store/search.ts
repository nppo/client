import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Vue } from 'nuxt-property-decorator'
import { Filter, Search } from '~/types/entities'
import { filterTypesValues } from '~/config/entities'

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
  addResults(state, results: { type: filterTypesValues; data: Search }) {
    const type = results.type
    const current = state.current?.[type]

    if (!current) {
      return
    }

    const items = results.data?.[type]

    if (!items) {
      return
    }

    // @ts-ignore-next-line
    current.items = [...current.items, ...items.items]
    current.next_cursor = items.next_cursor
  },
  setFilter(state, filter: Filter) {
    Vue.set(state.filters, filter.type, [...filter.values])
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

    async additionalResults(
      { commit },
      query: { searchString: string; type: filterTypesValues }
    ): Promise<void> {
      const {
        status,
        data: { data },
      } = await this.$repositories.search.result(query.searchString)

      if (status === 200) {
        commit('addResults', { type: query.type, data })
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
