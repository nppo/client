<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">Opgeslagen</h1>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Like, Person } from '~/types/models'

@Component({
  async asyncData({ $accessor }) {
    await $accessor.likes.fetchAll()
  },
  //   meta: {
  //     auth: {
  //       requiredPermissions: ['update people'],
  //     } as MetaAuthOptions,
  //   },
  //   middleware: ['auth', 'check-permissions'],
})
export default class PersonLikesPage extends mixins(NavigationRouterHook) {
  get person(): Person {
    return this.$accessor.people.current
  }

  get likes(): Like {
    return this.$accessor.likes.all
  }

  created(): void {
    // if (!this.person.can?.update) {
    //   return this.$nuxt.error({
    //     statusCode: 403,
    //     message: String(this.$i18n.t('pages.error.403')),
    //   })
    // }
  }
}
</script>
