<template>
  <div>
    <div
      v-for="parent in slicedListItems"
      :key="parent.id"
      class="flex flex-col h-full mb-3 overflow-hidden bg-white rounded-md shadow"
    >
      <LocaleLink class="flex flex-row" :path="`/product/${parent.id}`">
        <div class="w-1/4 h-24">
          <div class="w-full h-full bg-blue-800" />
        </div>

        <div class="flex flex-col flex-wrap w-3/4 px-4 py-2 mr-2 break-all">
          <span class="flex flex-row mb-1">
            <Badge :text="$t('entities.collection.singular')" />
          </span>

          <span class="text-base font-bold">
            {{ parent.title }}
          </span>
        </div>
      </LocaleLink>
    </div>

    <div class="mb-6">
      <div v-if="parents.length > maxItems" class="block mt-3 text-center">
        <span
          class="text-blue-400 underline cursor-pointer"
          @click="showingAll = !showingAll"
        >
          {{
            showingAll
              ? $t('general.show_less')
              : $t('general.show_more', { number: showMoreNumber })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ParentsList extends Vue {
  public showingAll: boolean = false

  @Prop({ type: Number, default: 3 }) maxItems!: number
  @Prop({ type: Array, required: true }) parents!: Product[]

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.parents.length
    }

    return this.maxItems
  }

  get showMoreNumber(): number {
    return this.parents.length - this.maxItems
  }

  get slicedListItems(): Product[] {
    return this.parents.slice(0, this.numberVisibleListItems)
  }
}
</script>
