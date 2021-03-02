<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-4/12">
          <!-- TODO: Profile info (https://way2web.atlassian.net/browse/SURAPP-216) -->
        </div>

        <div class="w-8/12">
          <h2 class="text-4xl font-bold">
            {{ $t('pages.person._id.about.title') }}
          </h2>
          <p class="mt-4">
            {{ person.about }}
          </p>

          <div class="flex items-center justify-between mt-10 mb-6">
            <div class="flex items-center space-x-5">
              <h2 class="text-4xl font-bold">
                {{ $t('entities.project.plural') }}
              </h2>
              <Badge :text="`${person.projects.length}`" color="yellow-brand" />
            </div>

            <SliderArrows
              v-if="person.projects.length > sliderShowMax"
              @previous-slide="$refs.projectSlider.previous()"
              @next-slide="$refs.projectSlider.next()"
            />
          </div>

          <BlockSlider ref="projectSlider" :slides-to-show="sliderShowMax">
            <div
              v-for="project in person.projects"
              :key="project.id"
              class="h-full px-2"
            >
              <ProjectBlock :project="project" />
            </div>
          </BlockSlider>
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
  private sliderShowMax: number = 3

  get person(): Person {
    return this.$accessor.people.current
  }
}
</script>
