<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <div />
      <div class="col-span-3">
        <SearchBar
          name="main"
          variant="main"
          :value.sync="searchString"
          @click="search()"
        />

        <div v-if="loading">
          <SearchSkeleton />
        </div>
        <div v-else>
          <div v-if="products.length > 0">
            <h1 class="text-2xl mb-3">Producten</h1>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="product in products"
                :key="product.id"
                class="bg-white rounded-md shadow-md overflow-hidden"
              >
                <div class="flex flex-col">
                  <div class="relative">
                    <img
                      class="w-full mb-2"
                      src="https://picsum.photos/296/150"
                      alt="Sunset in the mountains"
                    />
                    <div
                      class="bg-green-300 rounded-md absolute top-0 left-0 px-2 py-1 m-5 min-w-1/4"
                    >
                      tag
                    </div>
                  </div>
                  <div class="flex justify-between px-4">
                    <span>21 sep 2020</span>
                    <span>Thema</span>
                  </div>
                  <div class="flex flex-col p-4">
                    <span class="mb-2">{{ product.title }}</span>
                    {{ product.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>{{ $t('pages.search.no_results') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''
  private loading: boolean = false

  get products() {
    return this.$accessor.search.current
  }

  async search() {
    this.loading = true

    if (this.searchString) {
      this.$store.commit('search/setCurrent', this.searchString)

      await this.$accessor.search.result(this.searchString)
    }

    this.loading = false
  }
}
</script>
