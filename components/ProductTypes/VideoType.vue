<template>
  <ProductTypeBaseCard
    v-bind="{
      product,
      type,
      buttons: [
        {
          iconName: 'share-alt',
          iconStyle: 'fas',
          text: $t('pages.product.share'),
          textColor: 'white',
          color: 'blue-500',
        },
        {
          iconName: 'bookmark',
          iconStyle: 'fas',
          text: $t('pages.product.bookmark'),
          textColor: 'white',
          color: 'blue-500',
        },
      ],
    }"
  >
    <div
      class="flex items-center justify-center w-full h-full bg-cover"
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
  </ProductTypeBaseCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/entities'

@Component
export default class VideoType extends Vue {
  @Prop({ type: String }) type!: string
  @Prop({ type: Object }) product!: Product
}
</script>
