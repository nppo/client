<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-4/12">
          <div class="flex flex-col items-center p-4 mb-4">
            <!-- TODO: When image available make image dynamic: v-if="party.image" -->
            <img
              v-if="partyImage"
              class="inline w-24 h-24 mb-2 rounded-full shadow"
              :src="partyImage"
              :alt="party.name"
            />

            <h4 class="text-base font-bold">
              {{ party.name }}
            </h4>

            <div class="flex items-center justify-center mt-6 mb-5">
              <FollowButton />
            </div>

            <div class="flex items-center justify-center">
              <div
                class="flex justify-center w-8 h-8 p-2 mr-2 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'twitter-square']"
                  class="text-base"
                />
              </div>
              <div
                class="flex justify-center w-8 h-8 p-2 mr-2 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'linkedin']"
                  class="text-base"
                />
              </div>
              <div
                class="flex justify-center w-8 h-8 p-2 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'researchgate']"
                  class="text-base"
                />
              </div>
            </div>
          </div>

          <hr class="mb-8 border-gray-200" />
        </div>

        <div class="w-8/12">
          <h2 class="text-4xl font-bold">
            {{ $t('pages.party._id.about.title') }}
          </h2>

          <p class="mt-4">
            {{ party.description }}
          </p>

          <template v-if="!party.projects || party.projects.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.project.plural') }}
                </h2>
                <Badge
                  :text="`${party.projects.length}`"
                  color="yellow-brand"
                />
              </div>

              <SliderArrows
                v-if="party.projects.length > sliderShowMax"
                @previous-slide="$refs.projectSlider.previous()"
                @next-slide="$refs.projectSlider.next()"
              />
            </div>

            <BlockSlider ref="projectSlider" :slides-to-show="sliderShowMax">
              <div
                v-for="project in linkedEntity(party.projects)"
                :key="project.id"
                class="h-full px-2"
              >
                <ProjectBlock :project="project" />
              </div>
            </BlockSlider>
          </template>

          <template v-if="!party.products || party.products.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.product.plural') }}
                </h2>
                <Badge
                  :text="`${party.products.length}`"
                  color="yellow-brand"
                />
              </div>

              <SliderArrows
                v-if="party.products.length > sliderShowMax"
                @previous-slide="$refs.productSlider.previous()"
                @next-slide="$refs.productSlider.next()"
              />
            </div>

            <BlockSlider ref="productSlider" :slides-to-show="3">
              <div
                v-for="product in linkedEntity(party.products)"
                :key="product.id"
                class="h-full px-2"
              >
                <ProductBlock :product="product" />
              </div>
            </BlockSlider>
          </template>

          <template v-if="!party.parties || party.parties.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('pages.party._id.headings.parties') }}
                </h2>
                <Badge :text="`${party.parties.length}`" color="yellow-brand" />
              </div>

              <SliderArrows
                v-if="party.parties.length > sliderShowMax"
                @previous-slide="$refs.partySlider.previous()"
                @next-slide="$refs.partySlider.next()"
              />
            </div>

            <BlockSlider ref="partySlider" :slides-to-show="3">
              <div
                v-for="party in linkedEntity(party.parties)"
                :key="party.id"
                class="h-full px-2"
              >
                <PartyBlock :party="party" />
              </div>
            </BlockSlider>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Party } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params
    await $accessor.parties.fetchCurrent(Number(id))
  },
})
export default class PartyDetailPage extends mixins(NavigationRouterHook) {
  public partyImage: string = 'https://picsum.photos/200/200'
  public sliderShowMax: number = 3

  get party(): Party {
    return this.$accessor.parties.current
  }

  linkedEntity(entity: Array<any>): void {
    const entityItems = [...(entity || [])]

    return entityItems.sort((entityA, entityB) => entityB.id - entityA.id)
  }
}
</script>
