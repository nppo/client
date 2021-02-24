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
              @click.prevent="setActive(String(type.label))"
            >
              {{ $t('pages.index.types.' + type.label) }}
            </a>
          </nav>
        </div>

        <ProductSlider v-show="isActive('product')" :products="products" />
        <ProjectSlider v-show="isActive('project')" :projects="projects" />
        <PersonSlider v-show="isActive('person')" :persons="persons" />
        <PartySlider v-show="isActive('party')" :parties="parties" />
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
    this.$refs[ref].next()
  }

  previousSlide(ref: any) {
    this.$refs[ref].prev()
  }
}
</script>
