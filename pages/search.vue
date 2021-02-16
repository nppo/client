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

    <div class="container mx-auto md:px-5 lg:px-0">
      <div class="grid grid-cols-4 gap-4">
        <div class="mr-10">
          <CheckboxFilter @set-filters="setFilters" />
        </div>
        <div class="col-span-4 lg:col-span-3">
          <div v-if="loading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <div v-if="products.length > 0">
              <h2 class="text-3xl mb-3">Producten</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''
  private filterString: string = ''
  private loading: boolean = false
  private activeFilters: Array<any> = []

  get products() {
    return this.$accessor.search.current
  }

  setFilters(type: string, filters: Array<any>) {
    this.activeFilters = filters
    this.filterString = ''

    if (filters.length) {
      this.activeFilters.map(
        (filter) => (this.filterString += '&filters[' + type + '][]=' + filter)
      )
    }

    this.$accessor.search.setFilter({ type, values: filters })

    const query = {
      filters: encodeURIComponent(JSON.stringify({ themes: [filters] })),
    }

    this.$router.push({
      path: 'search',
      query,
    })
    this.search()
  }

  async search() {
    this.loading = true

    if (this.searchString || this.filterString) {
      const requestString = this.searchString
        ? 'query=' + this.searchString + this.filterString
        : this.filterString.substring(1)

      this.$store.commit('search/setCurrent', requestString)
      await this.$accessor.search.result(requestString)
    }

    this.loading = false
  }

  mounted() {
    if (this.$route.query.query) {
      // TODO Value isn't shown in input field
      this.searchString = this.$route.query.query.toString()
    }

    if (this.$route.query.filters) {
      const filterString = decodeURIComponent(
        this.$route.query.filters as string
      )

      const filters = JSON.parse(filterString)

      for (const type in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, type)) {
          this.setFilters(type, filters[type])
        }
      }
    }

    if (this.searchString || this.filterString) {
      this.search()
    }
  }
}
</script>
