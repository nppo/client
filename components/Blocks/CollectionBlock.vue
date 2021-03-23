<template>
  <LocaleLink
    :path="`/collection/1`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="relative">
      <div class="w-full h-32 mb-2 bg-blue-800" />

      <div class="flex items-center justify-between">
        <span class="absolute top-0 left-0 m-4 mb-5 min-w-1/4">
          <Badge
            class="w-full"
            icon-style="fas"
            icon-name="folder-open"
            text="collectie"
          />
        </span>
      </div>
    </div>

    <div class="flex justify-between px-4 text-tiny">
      <span>21 sep 2020</span>
    </div>

    <div class="flex flex-col p-4">
      <h4 class="mb-3 text-base break-all">Titel van de collectie</h4>

      <div>
        <span class="block mb-1 font-bold text-blue-800">
          {{ products.length }} producten:
        </span>

        <div class="flex flex-wrap text-gray-300">
          <div v-for="(product, index) in slicedProducts" :key="index">
            <span class="block mb-1 mr-2">{{ product }}</span>
          </div>
          <span class="font-bold text-blue-800">+{{ showMoreNumber }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-between px-4 pb-3 mt-auto">
      <div class="flex space-x-5">
        <div class="flex items-center space-x-1">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-base" />
          <span>111</span>
        </div>
        <div class="flex items-center space-x-1">
          <font-awesome-icon :icon="['fas', 'eye']" class="text-base" />
          <span>123</span>
        </div>
      </div>

      <span class="text-blue-500">
        <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
      </span>
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CollectionBlock extends Vue {
  public showingAll: boolean = false
  public products: Array<any> = [
    'Liefde maakt blind?',
    'Maria Toko',
    'Website: Hang in there',
    'Liefde maakt blind?',
    'Maria Toko',
    'Website: Hang in there',
    'Liefde maakt blind?',
    'Maria Toko',
    'Website: Hang in there',
  ]

  @Prop({ type: Number, default: 6 }) maxFilters!: number

  // get publishedAt(): string {
  //   const date = this.$dayjs(this.product.publishedAt)

  //   return date.locale(this.$i18n.locale).format('D MMM YYYY')
  // }

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.products.length
    }

    return this.maxFilters
  }

  get showMoreNumber(): number {
    return this.products.length - this.maxFilters
  }

  get slicedProducts(): any[] {
    return this.products.slice(0, this.numberVisibleListItems)
  }
}
</script>
