<template>
  <VueSlickCarousel
    ref="slider"
    class="slick-same-height"
    :arrows="false"
    :infinite="true"
    :speed="500"
    :slides-to-show="SlidesToShow"
    :slides-to-scroll="1"
  >
    <slot>
      <div/>
    </slot>
  </VueSlickCarousel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import VueSlickCarousel from 'vue-slick-carousel'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class BlockSlider extends Vue {
  $refs!: {
    slider: typeof VueSlickCarousel
  }

  @Prop({ type: Number, default: 4 }) SlidesToShow!: number

  next() {
    this.$refs.slider.next()
  }

  previous() {
    this.$refs.slider.prev()
  }
}
</script>

<style>
.slick-same-height .slick-track {
  display: flex !important;
}

.slick-same-height .slick-slide {
  height: inherit !important;
}

.slick-same-height .slick-slide > div {
  height: 100% !important;
}
</style>
