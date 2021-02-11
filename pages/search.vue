<template>
  <div class="flex-1">
    <Header has-search-bar class="mb-10">
      <div class="grid grid-cols-3 gap-4 h-56 relative">
        <SearchBar
          :aria-label="$t('pages.search.input_search')"
          variant="large"
          :value.sync="searchString"
          class="absolute bottom-0 right-0 w-9/12 -mt-28"
          @click="search()"
        />
      </div>
    </Header>

    <div class="container mx-auto">
      <div class="grid grid-cols-4 gap-4">
        <div />
        <div class="col-span-3">
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

  mounted() {
    if (this.$route.query.query) {
      this.searchString = this.$route.query.query.toString()
    }
  }
}
</script>
