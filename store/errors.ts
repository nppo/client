import { mutationTree } from 'nuxt-typed-vuex'
import { ErrorMessage } from '~/types/entities'

export const state = () => ({
  hasNewError: false,
  current: {} as ErrorMessage,
})

export type ErrorState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setCurrent(state, newValue: ErrorMessage) {
    state.hasNewError = true
    state.current = newValue
  },
  dismiss(state) {
    state.hasNewError = false
  },
})
