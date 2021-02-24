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
      <component
        v-bind="{ product, type }"
        :is="typeComponent"
        class="col-span-8 col-start-3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Product } from '~/types/entities'

@Component({
  async fetch(this: ProductDetailPage) {
    const { id } = this.$route.params

    await this.$accessor.products.fetchItem(Number(id))
  },
})
export default class ProductDetailPage extends mixins(NavigationRouterHook) {
  @Prop({ type: String, default: 'video' }) type!: string

  get id(): number {
    return Number(this.$route.params.id)
  }

  get typeComponent() {
    const type = this.type.charAt(0).toUpperCase() + this.type.slice(1)
    const component = () => import(`~/components/ProductTypes/${type}Type.vue`)
    return component
  }

  get product(): Product {
    return this.$accessor.products.all[this.id]
  }
}
</script>
