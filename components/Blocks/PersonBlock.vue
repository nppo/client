<template>
  <div class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow">
    <div class="flex flex-col items-center p-4">
      <!-- TODO: When image available make image dynamic: v-if="person.image" -->
      <img
        v-if="personImage"
        class="w-24 h-24 mb-2 rounded-full inline shadow"
        :src="personImage"
        :alt="person.firstName + '_avatar'"
      />

      <h4 class="text-base font-bold">
        {{ person.firstName }} {{ person.lastName }}
      </h4>
      <span class="mb-2 text-xs text-gray-300">{{ person.function }}</span>

      <div class="flex justify-evenly w-full mb-2">
        <div class="flex flex-col items-center">
          <span class="uppercase font-bold">projecten</span>
          <span>43</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="uppercase font-bold">producten</span>
          <span>125</span>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div
          class="flex justify-center rounded-full p-2 mr-2 bg-blue-500 text-white h-8 w-8"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter-square']"
            class="text-base"
          />
        </div>
        <div
          class="flex justify-center rounded-full p-2 mr-2 bg-blue-500 text-white h-8 w-8"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" class="text-base" />
        </div>
        <div
          class="flex justify-center rounded-full p-2 bg-blue-500 text-white h-8 w-8"
        >
          <font-awesome-icon
            :icon="['fab', 'researchgate']"
            class="text-base"
          />
        </div>
      </div>
    </div>

    <hr class="border-gray-100 mb-3" />

    <div class="flex flex-row flex-wrap justify-center mb-4">
      <div
        v-for="tag in person.tags"
        :key="'tag_shortcut_' + tag.id"
        class="rounded-md bg-green-300 px-3 py-1 m-1 text-xs font-extrabold cursor-pointer"
      >
        {{ tag.label }}
      </div>
    </div>

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <button
        type="button"
        class="inline-flex items-center px-2 py-1 space-x-2 text-blue-500 border border-blue-500 rounded-md font-bold"
      >
        <font-awesome-icon class="block" icon="plus" />
        <span>Volgen</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PersonBlock extends Vue {
  // TODO: When image available make image dynamic: v-if="party.image"
  public personImage: string = 'https://picsum.photos/200/200'

  @Prop({ type: Object, required: true }) person!: object
}
</script>
