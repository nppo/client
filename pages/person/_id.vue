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

            <div class="flex space-x-1">
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.projectSlider.previous()"
              >
                <font-awesome-icon class="text-base" icon="arrow-left" />
              </div>
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.projectSlider.next()"
              >
                <font-awesome-icon class="text-base" icon="arrow-right" />
              </div>
            </div>
          </div>

          <BlockSlider ref="projectSlider" :slides-to-show="3">
            <div
              v-for="project in person.projects"
              :key="project.id"
              class="h-full px-2"
            >
              <ProjectBlock :project="project" />
            </div>
          </BlockSlider>

          <div class="flex items-center justify-between mt-10 mb-6">
            <div class="flex items-center space-x-5">
              <h2 class="text-4xl font-bold">
                {{ $t('entities.product.plural') }}
              </h2>
              <Badge :text="`${person.products.length}`" color="yellow-brand" />
            </div>

            <div class="flex space-x-1">
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.productSlider.previous()"
              >
                <font-awesome-icon class="text-base" icon="arrow-left" />
              </div>
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.productSlider.next()"
              >
                <font-awesome-icon class="text-base" icon="arrow-right" />
              </div>
            </div>
          </div>

          <BlockSlider ref="productSlider" :slides-to-show="3">
            <div
              v-for="product in person.products"
              :key="product.id"
              class="h-full px-2"
            >
              <ProductBlock :product="product" />
            </div>
          </BlockSlider>

          <div class="flex items-center justify-between mt-10 mb-6">
            <div class="flex items-center space-x-5">
              <h2 class="text-4xl font-bold">
                {{ $t('entities.party.plural') }}
              </h2>
              <Badge :text="`${person.parties.length}`" color="yellow-brand" />
            </div>

            <div class="flex space-x-1" v-if="person.parties.length > 3">
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.partySlider.previous()"
              >
                <font-awesome-icon class="text-base" icon="arrow-left" />
              </div>
              <div
                class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
                @click="$refs.partySlider.next()"
              >
                <font-awesome-icon class="text-base" icon="arrow-right" />
              </div>
            </div>
          </div>

          <BlockSlider ref="partySlider" :slides-to-show="3">
            <div
              v-for="party in person.parties"
              :key="party.id"
              class="h-full px-2"
            >
              <PartyBlock :party="party" />
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
  get person(): Person {
    return this.$accessor.people.current
  }
}
</script>
