<template>
  <div class="bg-blue-800">
    <div class="container py-16 mx-auto">
      <div>
        <h2 class="mb-8 ml-2 text-3xl font-bold text-white">
          {{ $t('pages.index.discover_heading') }}
        </h2>

        <div class="flex items-start justify-between ml-2 mr-2">
          <nav class="flex mb-8 space-x-16" aria-label="Tabs">
            <button
              v-for="(type, index) in types"
              :key="index"
              type="button"
              class="pb-5 text-base font-medium text-white border-b-2 border-transparent outline-none focus:outline-none hover:text-white hover:border-yellow-brand whitespace-nowrap"
              :class="{
                'font-bold border-yellow-brand': isActive(
                  type.label.toString()
                ),
              }"
              @click="setActive(String(type.label))"
            >
              {{ $t(`entities.${type.label}.plural`) }}
            </button>
          </nav>

          <SliderArrows
            v-if="!isFetching"
            @previous-slide="$refs[`${activeTab}Slider`].previous()"
            @next-slide="$refs[`${activeTab}Slider`].next()"
          />
        </div>

        <div v-if="isFetching">
          <DiscoverSkeleton />
        </div>

        <div v-else>
          <BlockSlider v-show="isActive('product')" ref="productSlider">
            <div
              v-for="product in entities.products.items"
              :key="product.id"
              class="h-full px-2"
            >
              <component
                :is="
                  product.children && product.children.length > 0
                    ? 'CollectionBlock'
                    : 'ProductBlock'
                "
                :product="product"
                class="shadow-none"
              />
            </div>
          </BlockSlider>

          <BlockSlider v-show="isActive('project')" ref="projectSlider">
            <div
              v-for="project in entities.projects.items"
              :key="project.id"
              class="h-full px-2"
            >
              <ProjectBlock class="shadow-none" :project="project" />
            </div>
          </BlockSlider>

          <BlockSlider v-show="isActive('person')" ref="personSlider">
            <div
              v-for="person in entities.people.items"
              :key="person.id"
              class="h-full px-2"
            >
              <PersonBlock class="shadow-none" :person="person" />
            </div>
          </BlockSlider>

          <BlockSlider v-show="isActive('party')" ref="partySlider">
            <div
              v-for="party in entities.parties.items"
              :key="party.id"
              class="h-full px-2"
            >
              <PartyBlock class="shadow-none" :party="party" />
            </div>
          </BlockSlider>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Discover, Type } from '~/types/entities'

import CollectionBlock from '~/components/Blocks/CollectionBlock.vue'
import ProductBlock from '~/components/Blocks/ProductBlock.vue'

@Component({
  components: { CollectionBlock, ProductBlock },
})
export default class DiscoverSection extends Vue {
  public activeTab: String = 'product'

  @Prop({ type: Array, required: true }) types!: Type[]
  @Prop({ type: Object, required: true }) entities!: Discover
  @Prop({ type: Boolean, default: false }) readonly isFetching!: boolean

  isActive(tabItem: String): boolean {
    return this.activeTab === String(tabItem)
  }

  setActive(tabItem: String) {
    this.activeTab = tabItem
  }
}
</script>
