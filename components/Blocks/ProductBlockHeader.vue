<template>
  <div>
    <img
      v-if="product.links && product.links.preview && product.type === 'image'"
      class="object-cover w-full h-32 mb-2"
      :src="product.links.preview"
      :alt="product.title + '_image'"
    />

    <iframe
      v-if="product.type === 'youtube'"
      class="w-full h-32 mb-2"
      :src="product.links && product.links.preview"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :onmouseenter="playVideo()"
    >
    </iframe>

    <div
      v-if="product.type === 'collection'"
      class="w-full h-32 mb-2 bg-blue-800"
    />

    <div
      v-if="product.type === 'document'"
      class="flex items-center justify-center w-full h-32 mb-2 bg-blue-800"
    >
      <font-awesome-icon
        :icon="['fas', 'file']"
        class="text-3xl text-blue-500"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component
export default class ProductBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly product!: Product
  onYouTubeIframeAPIReady() {
    const player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M4Xrh8OP1Jk',
    })
  }
}
</script>
<script src="//www.youtube.com/player_api"></script>
