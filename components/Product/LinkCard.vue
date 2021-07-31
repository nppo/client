<template>
  <ProductBaseCard v-bind="settings">
    <LinkPrevue
      :url="url"
      card-width="100%"
      :show-button="false"
      :api-url="previewApiUrl"
      class="flex justify-center h-full w-full bg-gray-100 | link-prevue-wrapper"
    >
      <template slot-scope="props">
        <div v-if="props.img" class="w-full h-full">
          <img :src="props.img" class="block object-contain w-full h-full" />
        </div>
        <div
          v-else
          class="flex items-center justify-center w-full h-full bg-gray-100"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <div
              class="flex items-center justify-center mb-5 bg-gray-200 rounded-full h-28 w-28"
            >
              <font-awesome-icon
                :icon="['fas', 'file']"
                class="text-3xl text-blue-500"
              />
            </div>
            <p class="text-xl">
              {{ product.title }}
            </p>
            <p class="text-md">
              {{ $t('pages.product._id.preview.fallback') }}
            </p>
          </div>
        </div>
      </template>

      <template slot="loading">
        <div class="flex items-center justify-center w-full h-full">
          {{ $t('pages.product._id.preview.loading') }}&hellip;
        </div>
      </template>
    </LinkPrevue>
  </ProductBaseCard>
</template>

<script lang="ts">
import LinkPrevue from 'link-prevue'

import { Component, mixins } from 'nuxt-property-decorator'
import ProductPreview from '~/mixins/product-preview'

@Component({
  components: {
    LinkPrevue,
  },
})
export default class LinkCard extends mixins(ProductPreview) {
  get url(): string | null {
    if (this.product.links) {
      return this.product.links.preview
    }

    return ''
  }

  get previewApiUrl(): string | undefined {
    return process.env.PREVIEW_API_URL
  }
}
</script>

<style scoped>
.link-prevue-wrapper > div {
  @apply w-full;
}
</style>
