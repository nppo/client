<template>
  <div class="flex items-center justify-center w-full h-full bg-gray-100">
    <div class="flex flex-col items-center justify-center text-center">
      <div
        class="flex items-center justify-center p-8 mb-5 bg-gray-200 rounded-full"
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

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ImageViewer extends Vue {
  @Prop({ type: Object, required: true }) product!: Product
}
</script>
