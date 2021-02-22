<template>
  <div class="bg-blue-800">
    <div class="container py-24 mx-auto">
      <div>
        <div class="flex items-start justify-between">
          <nav class="flex mb-8 space-x-16" aria-label="Tabs">
            <a
              v-for="(type, index) in [...types].reverse()"
              :key="index"
              href="#"
              class="pb-5 text-sm font-medium text-white border-b-2 border-transparent hover:text-white hover:border-yellow-brand whitespace-nowrap"
              :class="{
                'font-bold border-yellow-brand': isActive(
                  type.label.toString()
                ),
              }"
              @click.prevent="setActive(type.label.toString())"
            >
              {{ $t('pages.index.types.' + type.label) }}
            </a>
          </nav>

          <div class="flex">
            <div
              class="flex justify-center w-8 h-8 p-2 mr-3 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
              @click="previousSlide"
            >
              <font-awesome-icon class="text-base" icon="arrow-left" />
            </div>

            <div
              class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
              @click="nextSlide"
            >
              <font-awesome-icon class="text-base" icon="arrow-right" />
            </div>
          </div>
        </div>
        <div v-if="isActive('product')">
          <VueSlickCarousel
            v-if="products.length > 0"
            ref="carousel"
            :arrows="false"
            :infinite="true"
            :speed="500"
            :slides-to-show="4"
            :slides-to-scroll="1"
          >
            <div v-for="product in products" :key="product.id">
              <ProductBlock :product="product" class="h-auto mr-4" />
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
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
export default class DiscoverSection extends Vue {
  public activeTab: String = 'product'

  @Prop({ type: Array, required: true }) types!: any
  @Prop({ type: Array, required: true }) products!: any

  isActive(menuItem: String): boolean {
    return this.activeTab === String(menuItem)
  }

  setActive(menuItem: String) {
    this.activeTab = menuItem
  }

  nextSlide() {
    this.$refs.carousel.next()
  }

  previousSlide() {
    this.$refs.carousel.prev()
  }
}
</script>
