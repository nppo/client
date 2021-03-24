<template>
  <ProductBaseCard v-bind="settings">
    <iframe class="w-full h-full" :src="url" frameborder="0"> </iframe>
  </ProductBaseCard>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import ProductPreview from '~/mixins/product-preview'

@Component
export default class DocumentCard extends mixins(ProductPreview) {
  get url(): string {
    const url =
      'https://docs.google.com/document/d/1ptrEWMme0hi0gpsg49SU2mrpKvWI71to9rRSYQNKNHg'

    return `https://docs.google.com/gview?url=${url}&embedded=true`
  }
}
</script>
