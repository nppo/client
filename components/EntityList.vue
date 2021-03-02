<template>
  <div>
    <div v-for="entity in slicedListItems" :key="entity.id" class="mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- TODO: When image available make image dynamic: v-if="entity.image" -->
          <img
            v-if="entityImage"
            class="inline w-10 h-10 mr-4 rounded-full"
            :src="entityImage"
            :alt="entity.firstName + '_avatar'"
          />

          <div class="flex flex-col">
            <span v-if="entity.firstName" class="font-bold">
              {{ entity.firstName }} {{ entity.lastName }}
            </span>
            <span v-else class="font-bold">
              {{ entity.name }}
            </span>

            <span v-if="entity.function" class="text-gray-300">
              {{ entity.function }}
            </span>
            <span v-else class="text-gray-300">Functie</span>
          </div>
        </div>

        <slot name="action" />
      </div>
    </div>

    <div v-if="entity.length > maxFilters" class="block mt-3 mb-6 text-center">
      <span
        class="text-blue-400 underline cursor-pointer"
        @click="showingAll = !showingAll"
      >
        {{
          showingAll
            ? $t('filters.show_less')
            : $t('filters.show_more', { number: showMoreNumber })
        }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class EntityList extends Vue {
  // TODO: When image available make image dynamic: v-if="entity.image" public
  public entityImage: string = 'https://picsum.photos/200/200'
  public showingAll: boolean = false

  @Prop({ type: Number, default: 3 }) maxFilters!: number
  @Prop({ type: Array, required: true }) entity!: Array<any>

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.entity.length
    }

    return this.maxFilters
  }

  get showMoreNumber(): number {
    return this.entity.length - this.maxFilters
  }

  get slicedListItems(): Array<any> {
    return this.entity.slice(0, this.numberVisibleListItems)
  }
}
</script>
