<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <div class="flex items-center justify-between">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
        <EditButton
          v-if="activePage === 'person'"
          :page="activePage"
          :entity-id="person.id"
        />
      </div>

      <div
        v-if="activePage === 'person'"
        class="flex justify-between space-x-32 mt-18"
      >
        <div class="w-4/12">
          <div class="flex flex-col items-center p-4 mb-4">
            <!-- TODO: When image available make image dynamic: v-if="person.image" -->
            <img
              v-if="personImage"
              class="inline w-24 h-24 mb-2 rounded-full shadow"
              :src="personImage"
              :alt="person.firstName + '_avatar'"
            />

            <h4 class="mr-2 text-base font-bold">
              {{ person.firstName }} {{ person.lastName }}
            </h4>

            <span class="mb-4 text-xs text-gray-300">
              {{ person.function }}
            </span>

            <div class="flex items-center justify-center">
              <FollowButton class="mb-6" />
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

          <div class="grid items-center grid-cols-2 mb-4">
            <div v-if="person.identifier" class="flex flex-col mb-4">
              <span class="font-bold uppercase">
                {{ $t('pages.person._id.profile.identifier') }}
              </span>

              <span class="uppercase">{{ person.identifier }}</span>
            </div>

            <div v-if="person.phone" class="flex flex-col mb-4">
              <span class="font-bold uppercase">
                {{ $t('pages.person._id.profile.phone') }}
              </span>

              <span>{{ person.phone }}</span>
            </div>

            <div v-if="person.email" class="flex flex-col mb-4">
              <span class="font-bold uppercase">
                {{ $t('pages.person._id.profile.email') }}
              </span>

              <span class="underline">{{ person.email }}</span>
            </div>
          </div>

          <hr class="mb-8 border-gray-200" />

          <div v-if="person.tags" class="mb-8">
            <h2 class="block mb-8 text-3xl font-normal">
              {{ $t('general.skills') }}
            </h2>

            <div class="flex flex-wrap">
              <Badge
                v-for="skill in person.tags"
                :key="'person_skill_' + skill.id"
                :text="skill.label"
                class="mb-2 mr-2"
              />
            </div>
          </div>

          <hr class="mb-8 border-gray-200" />

          <div v-if="person.themes">
            <h2 class="block mb-8 text-3xl font-normal">
              {{ $t('entities.theme.plural') }}
            </h2>

            <div class="flex flex-wrap">
              <Badge
                v-for="theme in person.themes"
                :key="'person_theme_' + theme.id"
                :text="theme.label"
                class="mb-2 mr-2"
              />
            </div>
          </div>
        </div>

        <div class="w-8/12">
          <div v-if="person.about">
            <h2 class="mb-4 mr-3 text-4xl font-bold">
              {{ $t('pages.person._id.about.title') }}
            </h2>

            <p>
              {{ person.about }}
            </p>
          </div>

          <template v-if="person.projects && person.projects.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.project.plural') }}
                </h2>
                <Badge
                  :text="`${person.projects.length}`"
                  color="yellow-brand"
                />
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
          </template>

          <template v-if="person.products && person.products.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.product.plural') }}
                </h2>
                <Badge
                  :text="`${person.products.length}`"
                  color="yellow-brand"
                />
              </div>

              <SliderArrows
                v-if="person.products.length > sliderShowMax"
                @previous-slide="$refs.productSlider.previous()"
                @next-slide="$refs.productSlider.next()"
              />
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
          </template>

          <template v-if="person.parties && person.parties.length > 0">
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.party.plural') }}
                </h2>
                <Badge
                  :text="`${person.parties.length}`"
                  color="yellow-brand"
                />
              </div>

              <SliderArrows
                v-if="person.parties.length > sliderShowMax"
                @previous-slide="$refs.partySlider.previous()"
                @next-slide="$refs.partySlider.next()"
              />
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
          </template>
        </div>
      </div>

      <NuxtChild
        :key="'person/' + $route.params.id + '/' + activePage"
        keep-alive
      />
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
  public sliderShowMax: number = 3
  public personImage: string = 'https://picsum.photos/200/200'
  public pages: Array<string> = ['person', 'edit']

  get person(): Person {
    return this.$accessor.people.current
  }

  get activePage(): string {
    const basePath =
      this.$i18n.defaultLocale !== this.$i18n.locale
        ? '/' + this.$i18n.locale + '/person/' + this.$route.params.id + '/'
        : '/person/' + this.$route.params.id + '/'

    return this.$route.path.substring(basePath.length) || 'person'
  }
}
</script>
