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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Party } from '~/types/entities'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params
    await $accessor.parties.fetchCurrent(Number(id))
  },
})
export default class PartyDetailPage extends mixins(NavigationRouterHook) {
  public partyImage: string = 'https://picsum.photos/200/200'

  get party(): Party {
    return this.$accessor.parties.current
  }
}
</script>
