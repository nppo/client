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

      <div class="flex justify-end px-4 pb-3 mt-auto">
        <span class="text-blue-500">
          <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
        </span>
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
import { Party } from '~/types/models'

@Component
export default class PartyBlock extends Vue {
  @Prop({ type: Object, required: true }) party!: Party
  @Prop({ type: Boolean, default: false }) readonly articleBlock!: boolean
}
</script>
