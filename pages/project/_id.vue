<template>
  <div class="flex-1 pb-24">
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
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activePage === 'project',
            }"
            :to="'/project/' + $route.params.id"
          >
            {{ $t('pages.project_show.project') }}
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activePage === 'products',
            }"
            :to="'/project/' + $route.params.id + '/products'"
          >
            {{ $t('types.product') }}
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activePage === 'people',
            }"
            :to="'/project/' + $route.params.id + '/people'"
          >
            {{ $t('types.person') }}
          </NuxtLink>
          <NuxtLink
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activePage === 'parties',
            }"
            :to="'/project/' + $route.params.id + '/parties'"
          >
            {{ $t('types.party') }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div class="container relative px-20 mx-auto">
      <div v-if="activePage === 'project'" class="grid grid-cols-4 gap-4 mb-2">
        <div class="col-span-3 mr-10">
          {{ project.description }}
        </div>
        <div />
      </div>

      <NuxtChild
        :key="'project/' + $route.params.id + '/' + activePage"
        :project-content="projectContent"
        keep-alive
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Project, Type } from '~/types/entities'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.projects.fetchCurrent(Number(id))

    if ($accessor.types.all.length < 1) {
      await $accessor.types.fetchAll()
    }
  },
})
export default class ProjectDetailPage extends mixins(NavigationRouterHook) {
  get project(): Project {
    return this.$accessor.projects.current
  }

  get types(): Type[] {
    return this.$accessor.types.all
  }

  get projectContent(): Array<any> | undefined {
    if (this.activePage === 'people') {
      return this.project.people
    }

    if (this.activePage === 'parties') {
      return this.project.parties
    }

    return this.project.products
  }

  get activePage() {
    const basePath =
      this.$i18n.defaultLocale !== this.$i18n.locale
        ? '/' + this.$i18n.locale + '/project/' + this.$route.params.id + '/'
        : '/project/' + this.$route.params.id + '/'

    return this.$route.path.substring(basePath.length) || 'project'
  }
}
</script>
