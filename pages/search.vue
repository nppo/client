<template>
  <div class="grid grid-cols-4 gap-4 p-6">
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
          <h1 class="mb-3 text-2xl">Producten</h1>
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
import { Component, Vue } from 'nuxt-property-decorator'

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
