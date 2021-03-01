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
          <a
            href="#"
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'font-bold border-yellow-brand': isActive('project'),
            }"
            @click.prevent="setActive('project')"
          >
            <span>{{ $t('pages.project_show.main_tab') }}</span>
          </a>

          <a
            v-for="(type, index) in types"
            :key="index"
            href="#"
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'font-bold border-yellow-brand': isActive(type.label.toString()),
              hidden: type.label === 'project',
            }"
            @click.prevent="setActive(String(type.label))"
          >
            <span>
              {{ $t('pages.index.types.' + type.label) }}
            </span>
          </a>
        </nav>
      </div>
    </div>

    <div class="container relative h-full px-16 mx-auto">
      <div class="grid grid-cols-4 gap-4 mb-2">
        <div class="col-span-3 mr-10">
          <ProjectContent v-show="isActive('project')" :project="project" />
          <div v-show="isActive('product')">Producten</div>
          <div v-show="isActive('person')">Personen</div>
          <div v-show="isActive('party')">Partijen</div>
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
  public activeTab: String = 'project'

  get project(): Project {
    return this.$accessor.projects.current
  }

  get types(): Type[] {
    return this.$accessor.types.all
  }

  isActive(tabItem: String): boolean {
    return this.activeTab === String(tabItem)
  }

  setActive(tabItem: String) {
    this.activeTab = tabItem
  }
}
</script>
