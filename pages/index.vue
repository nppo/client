<template>
  <div>
    <div class="grid grid-cols-3 gap-4 p-6">
      <div />
      <div class="col-span-2 ...">
        <div class="relative text-gray-600 focus-within:text-gray-400 mb-6">
          <input
            v-model="searchString"
            class="w-full py-4 px-6 focus:outline-none bg-white placeholder-blue-800 shadow-input rounded-3xl"
            type="search"
            :placeholder="'Start je zoektocht…'"
          />

          <span
            class="absolute w-10 inset-y-0 right-0 flex items-center justify-center bg-orange-500 text-white rounded-full m-2"
          >
            <button class="btn btn-primary">
              <font-awesome-icon icon="search" />
            </button>
          </span>
        </div>

        <div v-for="product in products" :key="product.id">
          {{ product.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Product } from '~/types/entities'

@Component({
  async fetch(this: IndexPage) {
    await this.$accessor.products.fetchAll()
  },
})
export default class IndexPage extends Vue {
  private searchString: string = ''

  get products(): Product[] {
    return this.$accessor.products.filter(this.searchString)
  }
}
</script>
