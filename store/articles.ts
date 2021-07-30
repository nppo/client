import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { Article } from '~/types/models'

export const state = () => ({
  show: {} as Article,
})

export type ArticlesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setShow(state, article: Article) {
    state.show = article
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchShow({ commit }, id: string): Promise<void> {
      const { status, data } = await this.$repositories.article.show(id)

      if (status === 200) {
        commit('setShow', data.data)
      }
    },
  }
)
