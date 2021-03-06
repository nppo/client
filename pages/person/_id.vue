<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <div class="flex items-center justify-between">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
        <EditButton
          v-if="activePage === 'person' && person.can.update"
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
            <img
              v-if="person.profilePictureUrl"
              class="inline w-24 h-24 mb-2 rounded-full shadow"
              :src="person.profilePictureUrl"
              :alt="person.firstName + '_avatar'"
            />

            <h4 class="mr-2 text-base font-bold">
              {{ person.firstName }} {{ person.lastName }}
            </h4>

            <span class="mb-4 text-xs text-gray-300">
              {{ person.function }}
            </span>

            <div class="flex items-center justify-center">
              <FollowButton
                entity="person"
                :entity-id="person.id"
                class="mb-6"
              />
            </div>
          </div>

          <hr class="mb-8 border-gray-200" />

          <div
            v-if="person.identifier || person.phone || person.email"
            class="grid items-center grid-cols-2 mb-4"
          >
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

          <hr
            v-if="person.identifier || person.phone || person.email"
            class="mb-8 border-gray-200"
          />

          <div v-if="person.skills && person.skills.length > 0" class="mb-8">
            <h2 class="block mb-8 text-3xl font-normal">
              {{ $t('general.skills') }}
            </h2>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="skill in person.skills"
                :key="'person_skill_' + skill.id"
                :text="skill.label"
                class="mb-2 mr-2"
              />
            </div>

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="person.themes && person.themes.length > 0">
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

          <div>
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.project.plural') }}
                </h2>

                <Badge
                  :text="`${person.projects.length}`"
                  color="yellow-brand"
                />

                <CreateButton
                  v-if="$auth.user && $auth.user.person.id === person.id"
                  v-can="'create projects'"
                  page="project"
                />
              </div>

              <SliderArrows
                v-if="person.projects.length > sliderShowMax"
                @previous-slide="$refs.projectSlider.previous()"
                @next-slide="$refs.projectSlider.next()"
              />
            </div>

            <BlockSlider
              v-if="person.projects && person.projects.length > 0"
              ref="projectSlider"
              :slides-to-show="sliderShowMax"
            >
              <div
                v-for="project in person.projects"
                :key="project.id"
                class="h-full px-2"
              >
                <ProjectBlock :project="project" />
              </div>
            </BlockSlider>
            <p v-else>{{ $t('pages.person._id.projects.empty') }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between mt-10 mb-6">
              <div class="flex items-center space-x-5">
                <h2 class="text-4xl font-bold">
                  {{ $t('entities.product.plural') }}
                </h2>
                <Badge
                  :text="`${person.products.length}`"
                  color="yellow-brand"
                />
                <CreateButton
                  v-if="$auth.user && $auth.user.person.id === person.id"
                  v-can="'create products'"
                  page="product"
                />
              </div>

              <SliderArrows
                v-if="person.products.length > sliderShowMax"
                @previous-slide="$refs.productSlider.previous()"
                @next-slide="$refs.productSlider.next()"
              />
            </div>

            <BlockSlider
              v-if="person.products && person.products.length > 0"
              ref="productSlider"
              :slides-to-show="3"
            >
              <div
                v-for="product in person.products"
                :key="product.id"
                class="h-full px-2"
              >
                <component
                  :is="
                    product.children.length > 0
                      ? 'CollectionBlock'
                      : 'ProductBlock'
                  "
                  :product="product"
                />
              </div>
            </BlockSlider>
            <p v-else>{{ $t('pages.person._id.products.empty') }}</p>
          </div>

          <div v-if="person.parties && person.parties.length > 0">
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
          </div>
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
import { Person } from '~/types/models'

import CollectionBlock from '~/components/Blocks/CollectionBlock.vue'
import ProductBlock from '~/components/Blocks/ProductBlock.vue'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params
    await $accessor.people.fetchCurrent(id)
  },

  components: {
    CollectionBlock,
    ProductBlock,
  },
})
export default class PersonDetailPage extends mixins(NavigationRouterHook) {
  public sliderShowMax: number = 3

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
