<template>
  <div class="relative overflow-hidden bg-white rounded">
    <div style="padding-bottom: calc(100% / (16 / 9))" class="relative">
      <div class="absolute inset-0">
        <slot />
      </div>
    </div>

    <div class="flex justify-between p-6 space-x-6">
      <div class="flex items-center space-x-6">
        <Badge
          icon-name="video"
          icon-style="fas"
          :text="$t(`pages.product.types.${type}`)"
        />

        <div>{{ product.title }}</div>
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
import { Product, ProductTypeButton } from '~/types/entities'

@Component
export default class ProductTypeBaseCard extends Vue {
  @Prop({ type: String, required: true }) type!: string
  @Prop({ type: Object, required: true }) product!: Product
  @Prop({ type: Array }) buttons!: ProductTypeButton[]
}
</script>
