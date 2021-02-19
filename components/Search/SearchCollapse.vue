<template>
  <div>
    <div
      v-if="showHeader"
      class="flex items-center justify-between mb-5 border-b border-gray-200"
      @click="toggleOpen"
    >
      <h2 class="mb-2 text-3xl">
        {{ header }}
      </h2>

      <div class="flex items-center space-x-3">
        <div
          class="px-2 py-1 font-bold text-blue-500 border border-blue-500 rounded-md cursor-pointer"
          @click="applyFilters"
        >
          {{ $t('pages.search.items.show_all') }}
        </div>
        <font-awesome-icon
          v-if="localOpen"
          class="block cursor-pointer"
          icon="minus"
        />
        <font-awesome-icon v-else class="block cursor-pointer" icon="plus" />
      </div>
    </div>
    <div v-show="localOpen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SearchCollapse extends Vue {
  @Prop({ type: Boolean, default: true }) open!: boolean
  @Prop({ type: Boolean, default: false }) showHeader!: boolean
  @Prop({ type: String }) header!: string

  private localOpen: boolean = this.open

  toggleOpen(): void {
    this.localOpen = !this.localOpen
  }

  applyFilters(): void {
    this.$emit('show-all')
  }
}
</script>
