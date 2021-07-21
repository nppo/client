<template>
  <LocaleLink
    :path="`/party/${party.id}`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="flex flex-col items-center p-4">
      <img
        v-if="party.partyPictureUrl"
        class="inline w-24 h-24 mb-2 rounded-full shadow"
        :src="party.partyPictureUrl"
        :alt="party.name + '_logo'"
      />

      <h4 class="text-base font-bold break-all">{{ party.name }}</h4>
      <span class="mb-2 text-xs text-gray-300">Subtitel</span>

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

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <button
        type="button"
        class="text-blue-500 focus:outline-none"
        @click.stop.prevent="toggleLike"
      >
        <font-awesome-icon
          :icon="[hasLike ? 'fas' : 'far', 'bookmark']"
          class="text-base"
        />
      </button>
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

  get hasLike() {
    return this.$accessor.likes.hasParty(this.party.id)
  }

  async toggleLike() {
    await this.$accessor.likes.store({
      likableType: Models.party,
      likableId: this.party.id,
    })
  }
}
</script>
