<template>
  <div class="w-full cursor-pointer">
    <ProductBlock v-if="product" :product="product" :article-block="true" />
    <ContentSkeleton v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Product } from '~/types/models'
import ContentSkeleton from '~/components/Article/Content/ContentSkeleton.vue'
import { ProductComponent } from '~/types/entities'

@Component({
  components: { ContentSkeleton },
})
export default class ProductContent extends Vue {
  @Prop({ type: Object, required: true }) data!: ProductComponent

  public product: Product | null = null

  async fetch(): Promise<void> {
    if (this.data?.identifier) {
      const { status, data } = await this.$repositories.product.show(
        this.data.identifier
      )
      if (status === 200) {
        this.product = data.data
      }
    }
  }
}
</script>
