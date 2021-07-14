<template>
  <component :is="viewerComponent" :product="product" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ProductCard extends Vue {
  @Prop({ type: Object, required: true }) product!: Product
  private viewerComponent: any = null

  mounted() {
    this.loadComponent
      .then(() => {
        this.viewerComponent = () => this.loadComponent
      })
      .catch(() => {
        this.viewerComponent = () =>
          import(`~/components/Product/FallbackCard.vue`)
      })
  }

  get loadComponent(): Promise<String> {
    const type =
      this.product.type.charAt(0).toUpperCase() + this.product.type.slice(1)
      
    return import(`~/components/Product/${type}Card.vue`)
  }
}
</script>
