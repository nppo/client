<template>
  <LocaleLink
    :path="`/party/${party.id}`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="flex flex-col items-center p-4">
      <!-- TODO: When image available make image dynamic: v-if="party.image" -->
      <img
        v-if="partyImage"
        class="inline w-24 h-24 mb-2 rounded-full shadow"
        :src="partyImage"
        :alt="party.name + '_logo'"
      />

      <h4 class="text-base font-bold">{{ party.name }}</h4>
      <span class="mb-2 text-xs text-gray-300">Subtitel</span>

      <div
        class="mb-4 text-center text-gray-300 line-clamp-4"
        :class="{ 'h-18': fixedHeight }"
      >
        {{ party.description }}
      </div>

      <div class="flex w-full justify-evenly">
        <div class="flex flex-col items-center">
          <span class="font-bold text-gray-300">projecten</span>
          <span>43</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-bold text-gray-300">producten</span>
          <span>125</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-bold text-gray-300">personen</span>
          <span>135</span>
        </div>
      </div>
    </div>

    <hr class="mb-10 border-gray-100" />

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <span class="text-blue-500">
        <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
      </span>
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Party } from '~/types/entities'

@Component
export default class PartyBlock extends Vue {
  // TODO: When image available make image dynamic: v-if="party.image"
  public partyImage: string = 'https://picsum.photos/200/200'

  @Prop({ type: Object, required: true }) party!: Party
  @Prop({ type: Boolean, default: false }) readonly fixedHeight!: boolean
}
</script>
