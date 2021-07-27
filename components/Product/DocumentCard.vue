<template>
  <ProductBaseCard v-bind="settings">
    <iframe class="w-full h-full" :src="url" frameborder="0"> </iframe>
  </ProductBaseCard>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ProductPreview from '~/mixins/product-preview'

@Component
export default class DocumentCard extends mixins(ProductPreview) {
  get url(): string {
    return `https://docs.google.com/gview?url=${this.product.links?.preview}&embedded=true`
  }
}
</script>
