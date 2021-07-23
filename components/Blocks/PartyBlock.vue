<template>
  <LocaleLink
    :path="`/party/${party.id}`"
    class="flex h-full overflow-hidden bg-white rounded-md shadow"
    :class="articleBlock ? 'flex-row' : 'flex-col'"
  >
    <div class="flex flex-col w-3/4">
      <div class="flex flex-col items-center p-4">
        <div v-if="!articleBlock">
          <img
            v-if="party.partyPictureUrl"
            class="inline w-24 h-24 mb-2 rounded-full shadow"
            :src="party.partyPictureUrl"
            :alt="party.name + '_logo'"
          />

          <h4 class="text-base font-bold break-all">{{ party.name }}</h4>
          <span class="mb-2 text-xs text-gray-300">Subtitel</span>
        </div>

        <div class="mb-4 text-center text-gray-300 line-clamp-4">
          {{ party.description }}
        </div>

        <div class="flex w-full justify-evenly">
          <div
            v-if="party.projects && party.projects.length > 0"
            class="flex flex-col items-center"
          >
            <span class="font-bold text-gray-300">projecten</span>
            <span>{{ party.projects.length }}</span>
          </div>
          <div
            v-if="party.products && party.products.length > 0"
            class="flex flex-col items-center"
          >
            <span class="font-bold text-gray-300">producten</span>
            <span>{{ party.products.length }}</span>
          </div>
          <div
            v-if="party.parties && party.parties.length > 0"
            class="flex flex-col items-center"
          >
            <span class="font-bold text-gray-300">partijen</span>
            <span>{{ party.parties.length }}</span>
          </div>
        </div>
      </div>

      <hr class="mb-10 border-gray-100" />

      <div v-if="showLikeButton" class="flex justify-end px-4 pb-3 mt-auto">
        <button
          v-if="showLikeButton"
          type="button"
          class="text-blue-500 focus:outline-none"
          :disabled="toggleLikeLoading"
          @click.stop.prevent="toggleLike"
        >
          <font-awesome-icon
            v-if="!toggleLikeLoading"
            :icon="[hasLiked ? 'fas' : 'far', 'bookmark']"
            class="text-base"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'spinner']"
            class="text-base animate-spin"
          />
        </button>
      </div>
    </div>

    <div
      v-if="articleBlock"
      class="flex flex-col items-center justify-center w-1/4"
    >
      <img
        v-if="party.partyPictureUrl"
        class="inline w-24 h-24 rounded-full shadow"
        :src="party.partyPictureUrl"
        :alt="party.name + '_logo'"
      />

      <h4 class="text-base font-bold break-all">{{ party.name }}</h4>
      <span class="mb-2 text-xs text-gray-300">Subtitel</span>
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Models } from '~/types/enums'
import { Party } from '~/types/models'

@Component
export default class PartyBlock extends Vue {
  @Prop({ type: Object, required: true }) party!: Party
  @Prop({ type: Boolean, default: false }) readonly articleBlock!: boolean
  public toggleLikeLoading: boolean = false

  get hasLiked() {
    return this.$accessor.likes.hasParty(this.party.id)
  }

  get showLikeButton(): boolean {
    return this.$auth.loggedIn
  }

  async toggleLike() {
    this.toggleLikeLoading = true
    await this.$accessor.likes.store({
      likableType: Models.party,
      likableId: this.party.id,
    })
    this.toggleLikeLoading = false
  }
}
</script>
