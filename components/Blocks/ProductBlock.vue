<template>
  <LocaleLink
    :path="`/product/${product.id}`"
    class="flex h-full overflow-hidden bg-white rounded-md shadow"
    :class="articleBlock ? 'flex-row' : 'flex-col'"
  >
    <div v-if="!articleBlock" class="relative">
      <ProductBlockHeader :product="product" />

      <div class="flex items-center justify-between">
        <span
          class="m-4 mb-5 min-w-1/4"
          :class="{
            'absolute top-0 left-0': product.links && product.links.preview,
          }"
        >
          <TypeBadge :product="product" />
        </span>
      </div>
    </div>

    <div class="flex flex-col w-3/4">
      <div v-if="!articleBlock" class="flex justify-between px-4 text-tiny">
        <span>{{ publishedAt }}</span>
      </div>

      <div class="flex flex-col p-4">
        <h4 class="mb-1 text-base break-all">
          {{ product.title }}
        </h4>

        <div
          class="text-gray-300"
          :class="{ 'line-clamp-4': product.links && product.links.preview }"
        >
          {{ product.summary }}
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
    </div>

    <div v-if="articleBlock" class="relative w-1/4 h-full">
      <ProductContentHeader :product="product" />

      <div class="flex items-center justify-between">
        <span
          class="m-4 mb-5 min-w-1/4"
          :class="{
            'absolute top-0 left-0': product.links && product.links.preview,
          }"
        >
          <TypeBadge :product="product" />
        </span>
      </div>
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ProductBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly product!: Product
  @Prop({ type: Boolean, default: false }) readonly articleBlock!: boolean

  get publishedAt(): string {
    const date = this.$dayjs(this.product.publishedAt)

    return date.locale(this.$i18n.locale).format('D MMM YYYY')
  }
}
</script>
