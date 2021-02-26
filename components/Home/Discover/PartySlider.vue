<template>
  <div class="-mt-20">
    <div class="flex justify-end mb-12">
      <div
        class="flex justify-center w-8 h-8 p-2 mr-3 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="previousSlide()"
      >
        <font-awesome-icon class="text-base" icon="arrow-left" />
      </div>

      <div
        class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="nextSlide()"
      >
        <font-awesome-icon class="text-base" icon="arrow-right" />
      </div>
    </div>

    <VueSlickCarousel
      v-if="parties"
      ref="party"
      :arrows="false"
      :infinite="true"
      :speed="500"
      :slides-to-show="4"
      :slides-to-scroll="1"
    >
      <div v-for="party in parties" :key="party.id">
        <PartyBlock
          :party="party"
          class="ml-2 mr-2 shadow-none"
          :fixed-height="true"
        />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import VueSlickCarousel from 'vue-slick-carousel'
import { Party } from '~/types/entities'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class PartySlider extends Vue {
  $refs!: {
    party: typeof VueSlickCarousel
  }

  @Prop({ type: Array, required: true }) parties!: Party[]

  nextSlide() {
    this.$refs.party.next()
  }

  previousSlide() {
    this.$refs.party.prev()
  }
}
</script>
