<template>
  <div class="relative overflow-hidden bg-white rounded">
    <div style="padding-bottom: calc(100% / (16 / 9))" class="relative">
      <div class="absolute inset-0">
        <slot />
      </div>
    </div>

    <div class="flex justify-between p-6 space-x-6">
      <div class="flex items-center space-x-6">
        <Badge v-bind="{ ...icon }" :text="$t(`pages.product.types.${type}`)" />

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
import { ProductTypeButton } from '~/types/entities'
import { Product } from '~/types/models'

@Component
export default class ProductTypeBaseCard extends Vue {
  @Prop({ type: String, required: true }) type!: string
  @Prop({ type: Object, required: true }) product!: Product
  @Prop({ type: Array }) buttons!: ProductTypeButton[]

  get icon(): { iconName: string; iconStyle: string } | null {
    let iconName = ''
    let iconStyle = ''

    switch (this.type) {
      case 'video':
        iconName = 'video'
        iconStyle = 'fas'
        break

      default:
        return null
    }

    return {
      iconName,
      iconStyle,
    }
  }
}
</script>
