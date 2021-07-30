import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import objectToFormData from '~/common/utils/objectToFormData'
import { Models } from '~/types/enums'
import { Like, User } from '~/types/models'

export const state = () => ({
  all: (localStorage.getItem('likes')
    ? JSON.parse(<string>localStorage.getItem('likes'))
    : null) as Like | null,
})

export type LikesState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setAll(state, newValue: Like) {
    state.all = newValue
  },
})

export const getters = getterTree(state, {
  hasProduct: (state) => (id: string) =>
    Boolean(state.all?.likedProducts.find((product) => product.id === id)) ||
    false,

  hasPerson: (state) => (id: string) =>
    Boolean(state.all?.likedPeople.find((person) => person.id === id)) || false,

  hasParty: (state) => (id: string) =>
    Boolean(state.all?.likedParties.find((party) => party.id === id)) || false,

  hasProject: (state) => (id: string) =>
    Boolean(state.all?.likedProjects.find((project) => project.id === id)) ||
    false,

  hasArticle: (state) => (id: string) =>
    Boolean(state.all?.likedArticles.find((article) => article.id === id)) ||
    false,
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchAll({ commit }): Promise<void> {
      const user = (this.$auth.user as unknown) as User

      if (!user) {
        return
      }

      const {
        status,
        data: { data },
      } = await this.$repositories.like.all(user.id)

      if (status === 200) {
        commit('setAll', data)
      }
    },

    async store(
      { commit },
      payload: {
        likableType: Models
        likableId: string
      }
    ): Promise<void> {
      const user = (this.$auth.user as unknown) as User

      if (!user) {
        return
      }

      const {
        status,
        data: { data },
      } = await this.$repositories.like.store(
        user.id,
        objectToFormData({
          likable_type: payload.likableType,
          likable_id: payload.likableId,
        })
      )

      if (status === 200) {
        commit('setAll', data)
      }
    },
  }
)
