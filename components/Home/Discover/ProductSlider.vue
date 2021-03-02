<template>
  <div class="-mt-20">
    <div
      class="flex justify-end mb-12"
      :class="{ invisible: products.length <= 4 }"
    >
      <div
        class="flex justify-center w-8 h-8 p-2 mr-3 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="$refs.slider.previous()"
      >
        <font-awesome-icon class="text-base" icon="arrow-left" />
      </div>

      <div
        class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="$refs.slider.next()"
      >
        <font-awesome-icon class="text-base" icon="arrow-right" />
      </div>
    </div>

    <BlockSlider v-if="products" ref="slider">
      <div v-for="product in products" :key="product.id" class="h-full px-2">
        <ProductBlock class="shadow-none" :product="product" />
      </div>
    </BlockSlider>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/entities'

@Component
export default class ProductSlider extends Vue {
  @Prop({ type: Array, required: true }) products!: Product[]
}
</script>
