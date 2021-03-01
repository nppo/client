<template>
  <div class="flex-1">
    <Header has-search-bar>
      <BackButton class="mt-8" :has-navigated-internal="hasNavigatedInternal" />

      <div class="pt-32 text-white">
        <h1 class="pb-6 text-4xl font-bold">
          {{ project.title }}
        </h1>
      </div>
    </Header>

    <div class="mb-16 border-b border-gray-200">
      <div class="container relative h-full mx-auto">
        <nav class="flex space-x-16" aria-label="Tabs">
          <NuxtLink
            class="pt-5 pb-5 text-base font-bold border-b-2 border-transparent outline-none border-yellow-brand hover:border-yellow-brand whitespace-nowrap"
            :to="'/projects/' + $route.params.id"
          >
            <span> Project </span>
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :to="'/projects/' + $route.params.id + '/products'"
          >
            <span> Producten </span>
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :to="'/projects/' + $route.params.id + '/people'"
          >
            <span> Personen </span>
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :to="'/projects/' + $route.params.id + '/parties'"
          >
            <span> Partijen </span>
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div class="container relative h-full px-16 mx-auto">
      <div class="grid grid-cols-4 gap-4 mb-2">
        <div class="col-span-3 mr-10">
          <div>Producten</div>
        </div>
        <div />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Project } from '~/types/entities'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.projects.fetchCurrent(Number(id))

    if ($accessor.types.all.length < 1) {
      await $accessor.types.fetchAll()
    }
  },
})
export default class ProjectProductsPage extends mixins(NavigationRouterHook) {
  get project(): Project {
    return this.$accessor.projects.current
  }
}
</script>
