<template>
  <div class="relative h-full overflow-hidden bg-white rounded">
    <div class="flex items-center justify-center w-full product-carousel">
      <slot />
    </div>

    <div class="flex justify-between p-6 space-x-6">
      <div class="flex items-center space-x-6">
        <TypeBadge :product="product" />

        <div>{{ product.title }}</div>
      </div>

      <div class="flex space-x-3">
        <Badge
          icon-name="share-alt"
          icon-style="fas"
          :text="$t('pages.product._id.actions.share')"
          text-color="white"
        />

        <Badge
          icon-name="bookmark"
          icon-style="fas"
          :text="$t('pages.product._id.actions.bookmark')"
          text-color="white"
          color="blue-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ProductCarousel extends Vue {
  @Prop({ type: Object, required: true }) product!: Product

  get icon(): { iconName: string; iconStyle: string } | null {
    let iconName = ''
    let iconStyle = ''

    switch (this.product.type) {
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
<style scoped>
.product-carousel {
  height: 26.5rem;
}
</style>
