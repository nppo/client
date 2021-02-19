<template>
  <div class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow">
    <div class="relative pt-8 text-center">
      <!-- TODO: When image available make image dynamic: v-if="party.image" -->
      <img
        v-if="partyImage"
        class="w-24 h-24 mb-2 rounded-full inline shadow"
        :src="partyImage"
        alt="Product picture"
      />
    </div>

    <div class="flex flex-col text-center p-4">
      <h4 class="text-base font-bold">{{ party.name }}</h4>
      <span class="mb-2 text-xs text-gray-300">Subtitel?</span>

      <div class="text-gray-300 line-clamp-4 mb-4">DESCRIPTION</div>

      <div class="flex items-center justify-evenly">
        <div class="flex flex-col">
          <span class="text-gray-300 font-bold">projecten</span>
          <span>43</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-300 font-bold">producten</span>
          <span>125</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-300 font-bold">personen</span>
          <span>135</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <span class="text-blue-500">
        <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
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
