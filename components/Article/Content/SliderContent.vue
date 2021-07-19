<template>
  <div class="relative w-full">
    <VueSlickCarousel
      ref="slider"
      class="slick-same-height"
      :infinite="true"
      :arrows="false"
      :speed="500"
      :slides-to-show="1"
      :center-mode="true"
      center-padding="100px"
      :focus-on-select="true"
    >
      <img v-for="(image, index) in data.images" :key="index" :src="image.url" class="block object-cover h-96" />
    </VueSlickCarousel>

    <div
      class="absolute flex items-center justify-center w-12 h-12 p-2 text-blue-800 rounded-full cursor-pointer left-6.5 bg-yellow-brand | arrows"
      @click="previous()"
    >
      <font-awesome-icon class="text-xl" icon="arrow-left" />
    </div>
    <div
      class="absolute flex items-center justify-center w-12 h-12 p-2 text-blue-800 rounded-full cursor-pointer right-6.5 bg-yellow-brand | arrows"
      @click="next()"
    >
      <font-awesome-icon class="text-xl" icon="arrow-right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import VueSlickCarousel from 'vue-slick-carousel'


@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class SliderContent extends Vue {
  private index: null | number = null

  $refs!: {
    slider: typeof VueSlickCarousel
  }

  @Prop({ type: Object, required: true }) data!: object

  next() {
    this.$refs.slider.next()
  }

  previous() {
    this.$refs.slider.prev()
  }
}
</script>

<style>
.arrows {
  top: calc(50% - 24px);
}

.slick-same-height .slick-track {
  display: flex !important;
}

.slick-same-height .slick-slide {
  height: inherit !important;
}

.slick-same-height .slick-slide > div {
  height: 100% !important;
}
.slick-slide img {
  @apply transition-spacing duration-100 ease-in-out py-4 !important;
}

.slick-current img {
  @apply rounded-md py-0 !important;
}

.slick-current::before {
  content: "";
  box-shadow: -20px 0 20px -20px rgba(0, 3, 63, 0.8) inset;
  width: 20px;
}
</style>
