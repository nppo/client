import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Vue } from 'nuxt-property-decorator'
import { Filter, Search } from '~/types/entities'
import { filterTypesValues } from '~/config/entities'

export const state = () => ({
  current: {} as Search,
  filters: {} as any,
  scrollState: 0,
})

export type SearchState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: Search) {
    state.current = newValue
  },
  addResults(state, results: { type: filterTypesValues; data: Search }) {
    const type = results.type
    const current = state.current?.[type]
    const resultData = results.data?.[type]

    if (!current || !resultData) {
      return
    }

    // @ts-ignore-next-line
    current.items = [...current.items, ...resultData.items]
    current.nextCursor = resultData.nextCursor
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
  saveScrollState(state, scrollState) {
    state.scrollState = scrollState
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
      }
    },

    setFilter({ commit }, data: Filter): void {
      commit('setFilter', data)
    },

    resetSearch({ commit }): void {
      commit('reset')
    },

    setScrollState({ commit }, scrollState: number): void {
      commit('saveScrollState', scrollState)
    },
  }
)
