<template>
  <div class="flex-1">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-4/12">
          <!-- TODO: Profile info (https://way2web.atlassian.net/browse/SURAPP-216) -->
        </div>

        <div class="w-8/12">
          <h2 class="text-4xl font-bold">
            {{ $t('pages.person._id.about') }}
          </h2>
          <p class="mt-4">
            {{ person.about }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Person } from '~/types/entities'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params
    await $accessor.people.fetchCurrent(Number(id))
  },
})
export default class PersonDetailPage extends mixins(NavigationRouterHook) {
  get person(): Person {
    return this.$accessor.people.current
  }
}
</script>
