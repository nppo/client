<template>
  <div class="flex-1">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-4/12">
          <div class="flex flex-col items-center p-4 mb-4">
            <!-- TODO: When image available make image dynamic: v-if="person.image" -->
            <img
              v-if="personImage"
              class="inline mb-2 w-24 h-24 rounded-full shadow"
              :src="personImage"
              :alt="person.firstName + '_avatar'"
            />

            <h4 class="text-base font-bold">
              {{ person.firstName }} {{ person.lastName }}
            </h4>

            <span class="mb-4 text-xs text-gray-300">
              {{ person.function }}
            </span>

            <div class="flex justify-center items-center">
              <FollowButton class="mb-6" />
            </div>

            <div class="flex justify-center items-center">
              <div
                class="flex justify-center p-2 mr-2 w-8 h-8 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'twitter-square']"
                  class="text-base"
                />
              </div>
              <div
                class="flex justify-center p-2 mr-2 w-8 h-8 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'linkedin']"
                  class="text-base"
                />
              </div>
              <div
                class="flex justify-center p-2 w-8 h-8 text-white bg-blue-500 rounded-full"
              >
                <font-awesome-icon
                  :icon="['fab', 'researchgate']"
                  class="text-base"
                />
              </div>
            </div>
          </div>

          <hr class="mb-8 border-gray-200" />

          <div class="grid grid-cols-2 items-center">
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
        </div>

        <div class="w-8/12">
          <h2 class="text-4xl font-bold">
            {{ $t('pages.person._id.about.title') }}
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
  public personImage: string = 'https://picsum.photos/200/200'

  get person(): Person {
    return this.$accessor.people.current
  }
}
</script>
