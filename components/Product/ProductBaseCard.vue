<template>
  <div class="relative h-full overflow-hidden bg-white rounded">
    <div class="relative product-base-card">
      <div class="absolute inset-0 cursor-pointer">
        <slot />
      </div>
    </div>

    <div class="flex justify-between p-6 space-x-6">
      <div class="flex items-center space-x-6">
        <TypeBadge :product="product" />

        <h1 class="text-base">{{ product.title }}</h1>
      </div>

      <div class="flex space-x-3">
        <Badge
          v-for="(button, index) in buttons"
          :key="index"
          v-bind="{ ...button }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ProductTypeButton } from '~/types/entities'
import { Product } from '~/types/models'

@Component
export default class ProductBaseCard extends Vue {
  @Prop({ type: Object, required: true }) product!: Product
  @Prop({ type: Array }) buttons!: ProductTypeButton[]
}
</script>
<style scoped>
.product-base-card {
  padding-bottom: calc(100% / (16 / 9));
}
</style>
