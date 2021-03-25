<template>
  <LocaleLink
    :path="`/product/${product.id}`"
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
            :text="$t('entities.collection.singular')"
          />
        </span>
      </div>
    </div>

    <div class="flex justify-between px-4 text-tiny">
      <span>{{ publishedAt }}</span>
    </div>

    <div class="flex flex-col p-4">
      <h4 class="mb-3 text-base break-all">{{ product.title }}</h4>

      <div v-if="product.children && product.children.length > 0">
        <span class="block mb-1 font-bold text-blue-800">
          {{ product.children.length }} product(en):
        </span>

        <div class="flex flex-wrap text-gray-300">
          <div v-for="(product, index) in linkedProducts" :key="index">
            <span class="block mb-1 mr-2">{{ product.title }}</span>
          </div>
          <span
            v-if="product.children.length > 6"
            class="font-bold text-blue-800"
          >
            +{{ showMoreNumber }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-between px-4 pb-3 mt-auto">
      <div class="flex space-x-5">
        <div class="flex items-center space-x-1">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-base" />
          <span>{{ product.likes }}</span>
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
import { Product } from '~/types/models'

@Component
export default class CollectionBlock extends Vue {
  public showingAll: boolean = false

  @Prop({ type: Object, required: true }) readonly product!: Product
  @Prop({ type: Number, default: 6 }) maxFilters!: number

  get publishedAt(): string {
    const date = this.$dayjs(this.product.publishedAt)

    return date.locale(this.$i18n.locale).format('D MMM YYYY')
  }

  get numberVisibleListItems(): number {
    if (this.showingAll && this.product.children) {
      return this.product.children.length
    }

    return this.maxFilters
  }

  get showMoreNumber(): number {
    return this.product.children!.length - this.maxFilters
  }

  get linkedProducts(): Product[] {
    return this.product.children?.slice(0, this.numberVisibleListItems) || []
  }
}
</script>
