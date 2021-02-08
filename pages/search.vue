<template>
  <div>
    <div class="grid grid-cols-4 gap-4 p-6">
      <div />
      <div class="col-span-3">
        <div class="relative text-gray-600 focus-within:text-gray-400 mb-6">
          <input
            v-model="searchString"
            class="w-full py-4 px-6 focus:outline-none bg-white placeholder-blue-800 shadow-input rounded-3xl"
            type="search"
            :placeholder="$t('pages.search.placeholder')"
            @keyup.enter="search()"
          />

          <span
            class="absolute w-10 inset-y-0 right-0 flex items-center justify-center bg-orange-500 text-white rounded-full m-2"
          >
            <button class="btn btn-primary">
              <font-awesome-icon icon="search" />
            </button>
          </span>
        </div>

        <!-- <SearchBar name="main" :value.sync="searchString" /> -->

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

        <div v-else>{{ $t('pages.search.no_results') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''

  get products() {
    return this.$accessor.products.search
  }

  async search() {
    this.$store.commit('products/setCurrent', this.searchString)

    await this.$accessor.products.search(this.searchString)
  }
}
</script>
