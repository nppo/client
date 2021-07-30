<template>
  <ProductBaseCard v-bind="settings">
    <iframe
      class="w-full h-full"
      :src="product.links.preview"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  </ProductBaseCard>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ProductPreview from '~/mixins/product-preview'

@Component
export default class ImageCard extends mixins(ProductPreview) {}
</script>
