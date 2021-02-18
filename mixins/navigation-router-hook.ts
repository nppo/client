import { Component, Vue } from 'nuxt-property-decorator'
import { RouteRecord } from 'vue-router/types'

@Component
export default class NavigationRouterHook extends Vue {
  private hasNavigatedInternal: boolean = false

  beforeRouteEnter(_to: RouteRecord, from: RouteRecord, next: Function) {
    next((vm: NavigationRouterHook) => {
      vm.hasNavigatedInternal = from.name !== null
    })
  }
}
