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

    <div class="container grid grid-cols-12 mx-auto -mt-104">
      <component
        v-bind="{ product, type }"
        :is="typeComponent"
        class="col-span-8 col-start-3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Product } from '~/types/entities'

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

  get product(): Product {
    return this.$accessor.products.current
  }
}
</script>
