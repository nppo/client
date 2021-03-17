<template>
  <div class="w-full h-full">
    <CoolLightBox
      :src="product.links.preview"
      :index="index"
      :items="[product.links.preview]"
      @close="index = null"
    />
    <div class="w-full h-full" @click="index = 0">
      <img :src="product.links.preview" class="object-contain w-full h-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import { Product } from '~/types/models'

@Component({
  components: {
    CoolLightBox,
  },
})
export default class ImageViewer extends Vue {
  @Prop({ type: Object, required: true }) product!: Product

  private index: null | number = null
}
</script>
