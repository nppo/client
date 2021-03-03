<template>
  <LocaleLink
    :path="`/product/${product.id}`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="relative">
      <!-- TODO: When image available make image dynamic: v-if="product.image" -->
      <img
        v-if="productImage"
        class="w-full mb-2"
        :src="productImage"
        :alt="product.title + '_image'"
      />

      <div class="flex items-center justify-between">
        <!-- TODO: When image available make image dynamic: product.image" -->
        <span
          class="m-4 mb-5 min-w-1/4"
          :class="{ 'absolute top-0 left-0': productImage }"
        >
          <!-- TODO: Make sure the badge reflects information from the product -->
          <Badge class="w-full" icon-style="fas" icon-name="link" text="TBA" />
        </span>
      </div>
    </div>

    <div class="flex justify-between px-4 text-tiny">
      <span>{{ publishedAt }}</span>
    </div>

    <div class="flex flex-col p-4">
      <h4
        class="mb-1 text-base break-all"
        :class="{ 'line-clamp-1': fixedHeight }"
      >
        {{ product.title }}
      </h4>

      <!-- TODO: When image available make image dynamic: product.image" -->
      <div
        class="text-gray-300"
        :class="{ 'line-clamp-4': productImage, 'h-18': fixedHeight }"
      >
        {{ product.description }}
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
import { Product } from '~/types/entities'

@Component
export default class ProductBlock extends Vue {
  // TODO: When image available make image dynamic: v-if="product.image"
  public productImage: string = 'https://picsum.photos/296/150'

  @Prop({ type: Object, required: true }) readonly product!: Product
  @Prop({ type: Boolean, default: false }) readonly fixedHeight!: boolean

  get publishedAt(): string {
    const date = this.$dayjs(this.product.publishedAt)

    return date.locale(this.$i18n.locale).format('D MMM YYYY')
  }
}
</script>
