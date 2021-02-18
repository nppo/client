<template>
  <div>
    <div
      v-if="showHeader"
      class="flex items-center justify-between mb-5 border-gray-200 border-b-1"
    >
      <h2 class="text-3xl font-balooTamma">
        {{ $t('entities.product.plural') }}
      </h2>

      <div class="flex items-center space-x-3">
        <div
          class="px-2 py-1 font-bold text-blue-500 border-blue-500 rounded-md cursor-pointer border-1"
          @click.prevent="applyFilters"
        >
          {{ $t('pages.search.items.show_all') }}
        </div>
        <font-awesome-icon
          v-if="localOpen"
          class="block cursor-pointer"
          icon="plus"
          @click="toggleOpen"
        />
        <font-awesome-icon
          v-if="!localOpen"
          class="block cursor-pointer"
          icon="minus"
          @click="toggleOpen"
        />
      </div>
    </div>
    <Hide :hide="!localOpen">
      <slot />
    </Hide>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Accordion extends Vue {
  @Prop({ type: Boolean, default: true }) open!: boolean
  @Prop({ type: Boolean, default: false }) showHeader!: boolean

  private localOpen: boolean = this.open

  toggleOpen(): void {
    this.localOpen = !this.localOpen
  }

  applyFilters(): void {
    this.$emit('showAll')
  }
}
</script>
