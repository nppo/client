<template>
  <div class="relative w-full">
     <CoolLightBox
      :src="activeImage"
      :index="index"
      :items="allImages"
      @close="index = null"
    />

    <VueSlickCarousel
      ref="slider"
      class="slick-same-height article-slider"
      :infinite="true"
      :arrows="false"
      :speed="500"
      :slides-to-show="1"
      :center-mode="true"
      center-padding="100px"
      :focus-on-select="true"
    >
      <div
        v-for="(image, imageIndex) in data.images"
        :key="imageIndex"
        class="relative"
        @click="setLargeImage(image.url)"
      >
        <img
          :src="image.url"
          class="block object-cover w-full cursor-pointer h-96"
        />

        <span class="absolute top-0 right-0 z-10 p-3 text-white">
          <font-awesome-icon class="text-xl fill-current" icon="expand" />
        </span>
      </div>
    </VueSlickCarousel>

    <div
      class="
        absolute
        flex
        items-center
        justify-center
        w-12
        h-12
        p-2
        text-blue-800
        rounded-full
        cursor-pointer
        left-6.5
        bg-yellow-brand
        |
        arrows
      "
      @click="previous()"
    >
      <font-awesome-icon class="text-xl" icon="arrow-left" />
    </div>
    <div
      class="
        absolute
        flex
        items-center
        justify-center
        w-12
        h-12
        p-2
        text-blue-800
        rounded-full
        cursor-pointer
        right-6.5
        bg-yellow-brand
        |
        arrows
      "
      @click="next()"
    >
      <font-awesome-icon class="text-xl" icon="arrow-right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SliderComponent } from '~/types/entities'

import VueSlickCarousel from 'vue-slick-carousel'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: {
    VueSlickCarousel,
    CoolLightBox,
  },
})
export default class SliderContent extends Vue {
  private index: null | number = null
  private activeImage: string = ''

  $refs!: {
    slider: typeof VueSlickCarousel
  }

  @Prop({ type: Object, required: true }) data!: SliderComponent

  get allImages() {
    return this.data.images.map((image: object) => {
        return image.url
    })
  }

  next() {
    this.$refs.slider.next()
  }

  previous() {
    this.$refs.slider.prev()
  }

  setLargeImage(image: string) {
    this.index = 0
    this.activeImage = image
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
.article-slider .slick-slide img {
  @apply transition-spacing duration-100 ease-in-out py-4 !important;
}

.article-slider .slick-current {
  @apply z-10 !important;

  box-shadow: 0 9px 0 0 white, 0 -9px 0 0 white,
    75px 0 100px -4px rgba(0, 3, 63, 0.8),
    -75px 0 100px -4px rgba(0, 3, 63, 0.8);
}

.article-slider .slick-current img {
  @apply rounded-md py-0 !important;
}
</style>
