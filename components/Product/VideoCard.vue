<template>
  <ProductBaseCard v-if="product.links" v-bind="settings">
    <div class="w-full h-full cursor-pointer">
      <video-player
        ref="videoPlayer"
        class="videoplayer"
        :options="playerOptions"
        :playsinline="true"
      >
      </video-player>
    </div>
  </ProductBaseCard>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import ProductPreview from '~/mixins/product-preview'

@Component({
  components: {
    videoPlayer,
  },
})
export default class ImageCard extends mixins(ProductPreview) {
  private index: null | number = null
  private playerOptions: object = {
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        src: this.product.links?.preview,
      },
    ],
    fluid: true,
    suppressNotSupportedError: true,
    notSupportedMessage: String(
      this.$i18n.t('pages.product._id.preview.fallback')
    ),
  }
}
</script>
