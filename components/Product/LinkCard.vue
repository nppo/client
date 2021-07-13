<template>
  <ProductBaseCard v-bind="settings">
    <LinkPrevue :url="url" cardWidth="100%" :showButton="false" class="flex justify-center h-full w-full bg-gray-100 | link-prevue-wrapper">
      <template slot-scope="props">
        <div v-if="props.img" class="w-full h-full">
          <img
            :src="props.img"
            class="block object-contain w-full h-full"
          />
        </div>
        <div v-else class="flex items-center justify-center w-full h-full bg-gray-100">
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
import Component, { mixins } from 'vue-class-component'
import ProductPreview from '~/mixins/product-preview'

import LinkPrevue from 'link-prevue'

@Component({
  components: {
    LinkPrevue
  }
})
export default class LinkCard extends mixins(ProductPreview) {
  get url(): string {
    return this.product.links?.preview
  }
}
</script>

<style>
  .link-prevue-wrapper > div{
    @apply w-full;
  }
</style>
