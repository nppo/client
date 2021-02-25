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
      v-if="people"
      ref="person"
      :arrows="false"
      :infinite="true"
      :speed="500"
      :slides-to-show="4"
      :slides-to-scroll="1"
    >
      <div v-for="person in people" :key="person.id">
        <PersonBlock :person="person" class="ml-2 mr-2 shadow-none" />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import VueSlickCarousel from 'vue-slick-carousel'
import PersonBlock from '../../Blocks/PersonBlock.vue'

import { Person } from '~/types/entities'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({
  components: {
    PersonBlock,
    VueSlickCarousel,
  },
})
export default class PersonSlider extends Vue {
  @Prop({ type: Array, required: true }) people!: Person[]

  nextSlide() {
    this.$refs.person.next()
  }

  previousSlide() {
    this.$refs.person.prev()
  }
}
</script>
