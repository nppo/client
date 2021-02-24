<template>
  <div class="bg-blue-800">
    <div class="container py-16 mx-auto">
      <div>
        <h2 class="mb-8 ml-2 text-3xl font-bold text-white">
          {{ $t('pages.index.discover_heading') }}
        </h2>

        <div class="flex items-start justify-between ml-2 mr-2">
          <nav class="flex mb-8 space-x-16" aria-label="Tabs">
            <a
              v-for="(type, index) in types"
              :key="index"
              href="#"
              class="pb-5 text-base font-medium text-white border-b-2 border-transparent outline-none hover:text-white hover:border-yellow-brand whitespace-nowrap"
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
              @click="previousSlide(activeTab)"
            >
              <font-awesome-icon class="text-base" icon="arrow-left" />
            </div>

            <div
              class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
              @click="nextSlide(activeTab)"
            >
              <font-awesome-icon class="text-base" icon="arrow-right" />
            </div>
          </div>
        </div>

        <div v-if="isActive('product')">
          <VueSlickCarousel
            v-if="products.length > 0"
            :ref="activeTab"
            :arrows="false"
            :infinite="true"
            :speed="500"
            :slides-to-show="4"
            :slides-to-scroll="1"
          >
            <div v-for="product in products" :key="product.id">
              <ProductBlock :product="product" class="ml-2 mr-2 shadow-none" />
            </div>
          </VueSlickCarousel>
        </div>

        <div v-if="isActive('project')">
          <VueSlickCarousel
            v-if="projects.length > 0"
            :ref="activeTab"
            :arrows="false"
            :infinite="true"
            :speed="500"
            :slides-to-show="4"
            :slides-to-scroll="1"
          >
            <div
              v-for="project in projects"
              :key="project.id"
              class="text-white"
            >
              {{ project.title }} <br />
              {{ project.description }}
            </div>
          </VueSlickCarousel>
        </div>

        <div v-if="isActive('person')">
          <VueSlickCarousel
            v-if="persons.length > 0"
            :ref="activeTab"
            :arrows="false"
            :infinite="true"
            :speed="500"
            :slides-to-show="4"
            :slides-to-scroll="1"
          >
            <div v-for="person in persons" :key="person.id">
              <PersonBlock :person="person" class="ml-2 mr-2 shadow-none" />
            </div>
          </VueSlickCarousel>
        </div>

        <div v-if="isActive('party')">
          <VueSlickCarousel
            v-if="parties.length > 0"
            :ref="activeTab"
            :arrows="false"
            :infinite="true"
            :speed="500"
            :slides-to-show="4"
            :slides-to-scroll="1"
          >
            <div v-for="party in parties" :key="party.id">
              <PartyBlock :party="party" class="ml-2 mr-2 shadow-none" />
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
import { Party, Person, Product, Project, Type } from '~/types/entities'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class DiscoverSection extends Vue {
  public activeTab: String = 'product'

  @Prop({ type: Array, required: true }) types!: Type[]
  @Prop({ type: Array, required: true }) products!: Product[]
  @Prop({ type: Array, required: true }) persons!: Person[]
  @Prop({ type: Array, required: true }) parties!: Party[]
  @Prop({ type: Array, required: true }) projects!: Project[]

  isActive(menuItem: String): boolean {
    return this.activeTab === String(menuItem)
  }

  setActive(menuItem: String) {
    this.activeTab = menuItem
  }

  nextSlide(ref: any) {
    if ((this.activeTab = String(ref))) {
      this.$refs[ref].next()
    }
  }

  previousSlide(ref: any) {
    this.$refs[ref].prev()
  }
}
</script>
