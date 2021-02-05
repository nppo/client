<template>
  <div>
    <div class="grid grid-cols-4 gap-4 p-6">
      <div />
      <div class="col-span-3">
        <SearchBar name="main" :value.sync="searchString" />

        <div v-if="products.length > 0">
          <h1 class="text-2xl mb-3">Producten</h1>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="product in products" :key="product.id">
              <div class="flex flex-col">
                <span class="mb-3">{{ product.title }}</span>
                {{ product.description }}
              </div>
            </div>
          </div>
        </div>

        <div v-else>Geen producten gevonden</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Product } from '~/types/entities'

@Component({
  async fetch(this: SearchPage) {
    await this.$accessor.products.fetchAll()
  },
})
export default class SearchPage extends Vue {
  private searchString: string = ''

  get products(): Product[] {
    return this.$accessor.products.filter(this.searchString)
  }
}
</script>
