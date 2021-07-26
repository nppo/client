<template>
  <ProductBaseCard v-if="product.links" v-bind="settings">
    <div class="w-full h-full cursor-pointer">
      <CoolLightBox
        :src="product.links.preview"
        :index="index"
        :items="[product.links.preview]"
        @close="index = null"
      />
      <div class="w-full h-full" @click="index = 0">
        <img
          :src="product.links.preview"
          class="block object-contain w-full h-full"
        />
      </div>
    </div>
  </ProductBaseCard>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import CoolLightBox from 'vue-cool-lightbox'
import ProductPreview from '~/mixins/product-preview'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: {
    CoolLightBox,
  },
})
export default class ImageCard extends mixins(ProductPreview) {
  private index: null | number = null
}
</script>
