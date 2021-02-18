<template>
  <div
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow-block"
  >
    <div class="relative pt-8 text-center">
      <!-- TODO: When image available make image dynamic: v-if="party.image" -->
      <img
        v-if="partyImage"
        class="w-32 h-32 mb-2 rounded-full inline"
        :src="partyImage"
        alt="Product picture"
      />
    </div>

    <div class="flex flex-col text-center">
      <h4 class="text-base">{{ party.name }}</h4>
      <span class="mb-2 text-xs text-gray-500">Subtitel?</span>

      <!-- TODO: When image available make image dynamic: party.image" -->
      <div class="text-gray-500 text-xs text-center">
        DESCRIPTION
      </div>
    </div>

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <span class="bg-gray-100 text-blue-500 rounded-full py-1 px-2">
        <font-awesome-icon :icon="['fas', 'bookmark']" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PartyBlock extends Vue {
  // TODO: When image available make image dynamic: v-if="party.image"
  public partyImage: string = 'https://picsum.photos/200/200'

  @Prop({ type: Object, required: true }) party!: object
}
</script>
