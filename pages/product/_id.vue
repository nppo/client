<template>
  <div class="flex-1">
    <Header
      image-filename="product_header_bg.jpg"
      has-dark-header
      has-search-bar
    >
      <div
        class="flex justify-between"
        :class="{
          'mt-8 pb-96': activePage === 'product',
          'pb-4': activePage !== 'product',
        }"
      >
        <BackButton :has-navigated-internal="hasNavigatedInternal" />

        <EditButton
          v-if="activePage === 'product'"
          :page="activePage"
          :entity-id="product.id"
        />
      </div>
    </Header>

    <div
      v-if="activePage === 'product'"
      class="container grid grid-cols-12 mx-auto -mt-104"
    >
      <component
        v-bind="{ product, type }"
        :is="typeComponent"
        class="col-span-8 col-start-3"
      />
    </div>

    <NuxtChild />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Product } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.products.fetchCurrent(Number(id))
  },
})
export default class ProductDetailPage extends mixins(NavigationRouterHook) {
  private type: string = 'video'

  get typeComponent() {
    const type = this.type.charAt(0).toUpperCase() + this.type.slice(1)
    const component = () => import(`~/components/ProductTypes/${type}Type.vue`)
    return component
  }

  get activePage(): string {
    const basePath =
      this.$i18n.defaultLocale !== this.$i18n.locale
        ? '/' + this.$i18n.locale + '/product/' + this.$route.params.id + '/'
        : '/product/' + this.$route.params.id + '/'

    return this.$route.path.substring(basePath.length) || 'product'
  }

  get product(): Product {
    return this.$accessor.products.current
  }
}
</script>
