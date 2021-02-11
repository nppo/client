<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <div />
      <div class="col-span-3">
        <!-- TODO SURAPP-168: Place SearchBar in header component -->
        <SearchBar
          :aria-label="$t('pages.search.input_search')"
          variant="large"
          :value.sync="searchString"
          @click="search()"
        />

        <div v-if="loading">
          <SearchSkeleton />
        </div>
        <div v-else>
          <div v-if="products.length > 0">
            <h2 class="text-3xl mb-3">Producten</h2>

            <div class="grid grid-cols-3 gap-4">
              <div v-for="product in products" :key="product.id">
                <ProductBlock :product="product" />
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
