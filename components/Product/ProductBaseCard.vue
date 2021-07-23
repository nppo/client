<template>
  <div class="relative">
    <div class="relative overflow-hidden bg-white rounded-t product-base-card">
      <div class="absolute inset-0">
        <slot />
      </div>
    </div>

    <div
      class="absolute inset-x-0 flex items-center justify-between p-6 space-x-6 overflow-hidden bg-white rounded-b"
    >
      <div class="flex items-center space-x-6">
        <TypeBadge :product="product" />

        <h1 class="text-base">{{ product.title }}</h1>
      </div>

      <div class="flex space-x-3">
        <Badge
          v-for="(button, index) in buttons"
          :key="index"
          v-bind="{ ...button }"
          v-on="{ ...button.on }"
        />

        <Badge
          v-if="showLikeButton"
          :icon-name="hasLiked ? 'minus' : 'bookmark'"
          :icon-style="hasLiked ? 'fas' : 'far'"
          :text="
            hasLiked
              ? $t('pages.product._id.actions.bookmarked')
              : $t('pages.product._id.actions.bookmark')
          "
          text-color="white"
          color="blue-500"
          tag="button"
          :class="{ 'animate-pulse': toggleLikeLoading }"
          :disabled="toggleLikeLoading"
          type="button"
          @click="toggleLike()"
        />

        <a
          v-if="product.type === 'link'"
          :href="product.links.preview"
          class="flex items-center px-2 py-1 font-bold text-white rounded-md bg-orange-brand"
        >
          {{ $t('pages.product._id.actions.visit') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ProductTypeButton } from '~/types/entities'
import { Models } from '~/types/enums'
import { Product } from '~/types/models'

@Component
export default class ProductBaseCard extends Vue {
  @Prop({ type: Object, required: true }) product!: Product
  @Prop({ type: Array }) buttons!: ProductTypeButton[]
  public toggleLikeLoading: boolean = false

  get hasLiked() {
    return this.$accessor.likes.hasProduct(this.product.id)
  }

  get showLikeButton(): boolean {
    return this.$auth.loggedIn
  }

  async toggleLike() {
    this.toggleLikeLoading = true
    await this.$accessor.likes.store({
      likableType: Models.product,
      likableId: this.product.id,
    })
    this.toggleLikeLoading = false
  }
}
</script>

<style scoped>
.product-base-card {
  padding-bottom: calc(100% / (16 / 9));
}
</style>
