<template>
  <div class="flex-1">
    <Header
      image-filename="product_header_bg.jpg"
      has-dark-header
      has-search-bar
    >
      <div class="mt-8 pb-96">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
      </div>
    </Header>

    <div
      v-if="!$fetchState.pending"
      class="container grid grid-cols-12 mx-auto -mt-104"
    >
      <div
        class="relative col-span-8 col-start-3 overflow-hidden bg-white rounded"
      >
        <div style="padding-bottom: calc(100% / (16 / 9))" class="relative">
          <div
            class="absolute inset-0 flex items-center justify-center bg-cover"
            style="
              background-image: url('https://source.unsplash.com/xTq26wLo5do/1600x900');
            "
          >
            <font-awesome-icon
              size="6x"
              :icon="['far', 'play-circle']"
              class="block text-white"
            />
          </div>
        </div>

        <div class="flex justify-between p-6 space-x-6">
          <div class="flex items-center space-x-6">
            <div
              class="flex items-center px-3 py-1 space-x-2 text-xs font-extrabold bg-green-300 rounded-md cursor-pointer"
            >
              <font-awesome-icon :icon="['fas', 'video']" class="block" />
              <span>{{ $t('pages.product.download_entities.video') }}</span>
            </div>
            <div>{{ product.title }}</div>
          </div>
          <div class="flex space-x-3">
            <button
              class="flex items-center px-3 py-1 space-x-2 text-xs font-extrabold text-white bg-blue-500 rounded-md cursor-pointer"
            >
              <font-awesome-icon :icon="['fas', 'share-alt']" class="block" />
              <span>{{ $t('pages.product.share') }}</span>
            </button>
            <button
              class="flex items-center px-3 py-1 space-x-2 text-xs font-extrabold text-white bg-blue-500 rounded-md cursor-pointer"
            >
              <font-awesome-icon :icon="['fas', 'bookmark']" class="block" />
              <span>{{ $t('pages.product.bookmark') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Product } from '~/types/entities'

@Component({
  async fetch(this: ProductDetailPage) {
    const { id } = this.$route.params

    await this.$accessor.products.fetchItem(Number(id))
  },
})
export default class ProductDetailPage extends mixins(NavigationRouterHook) {
  get id(): number {
    return Number(this.$route.params.id)
  }

  get product(): Product {
    return this.$accessor.products.all[this.id]
  }
}
</script>
