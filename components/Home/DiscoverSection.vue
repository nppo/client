<template>
  <div class="bg-blue-800">
    <div class="container py-24 mx-auto">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          class="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option>My Account</option>
          <option>Company</option>
          <option selected>Team Members</option>
          <option>Billing</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="flex mb-8 space-x-16" aria-label="Tabs">
          <a
            v-for="(type, index) in [...types].reverse()"
            :key="index"
            href="#"
            class="pb-5 text-sm font-medium text-white border-b-2 border-transparent hover:text-white hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'font-bold border-yellow-brand': isActive(type.label.toString()),
            }"
            @click.prevent="setActive(type.label.toString())"
          >
            {{ $t('pages.index.types.' + type.label) }}
          </a>
        </nav>
        <div v-if="isActive('product')">
          <div
            class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="product in getMaxEntities(products, 5)"
              :key="product.id"
            >
              <ProductBlock :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DiscoverSection extends Vue {
  public activeTab: String = 'product'

  @Prop({ type: Array, required: true }) types!: any
  @Prop({ type: Array, required: true }) products!: any

  getMaxEntities(entities: Array<any>, max: number): Array<any> {
    return entities.slice(0, max)
  }

  isActive(menuItem: String): boolean {
    return this.activeTab === String(menuItem)
  }

  setActive(menuItem: String) {
    this.activeTab = menuItem
  }
}
</script>
