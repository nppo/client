<template>
  <div class="flex-1">
    <Header has-search-bar class>
      <div class="container pb-16">
        <component
          :is="navigatedInternal ? 'button' : 'NuxtLink'"
          v-bind="{ ...(navigatedInternal ? { type: 'button' } : { to: '/' }) }"
          class="inline-flex items-center px-2 py-1 mt-8 space-x-2 text-white bg-blue-500 rounded"
          v-on="{
            ...(navigatedInternal ? { click: () => this.$router.back() } : {}),
          }"
        >
          <font-awesome-icon class="block" icon="arrow-left" />
          <span>{{ $t('page.back') }}</span>
        </component>

        <h1 class="mt-8 text-4xl font-bold text-gray-100">
          {{ $t('pages.search.title') }}
        </h1>
      </div>
    </Header>

    <div class="container mx-auto -mt-6">
      <div class="relative grid grid-cols-4 gap-4 mb-2">
        <SearchBar
          :aria-label="$t('pages.search.input_search')"
          variant="large"
          :value.sync="searchString"
          class="col-span-3 col-start-2"
          @click="search()"
        />
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div />
        <div class="col-span-4 lg:col-span-3">
          <div v-if="isLoading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <div v-if="products.length > 0">
              <h2 class="mb-3 text-3xl">Producten</h2>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
import { RouteRecord } from 'vue-router/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''
  private filterString: string = ''
  private loading: boolean = false
  public navigatedInternal: boolean = true
  private activeFilters: Array<any> = []

  get products() {
    return this.$accessor.search.current
  }

  get isLoading(): boolean {
    return this.$accessor.search.isLoading
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
    const requestString: string = this.searchString
      ? 'query=' + this.searchString + this.filterString
      : this.filterString.substring(1)

    if ((this.$route.query.query as string) !== this.searchString) {
      this.$router.replace({ query: { query: requestString } })
    }

    await this.$accessor.search.result(requestString)
  }

  beforeRouteEnter(_to: RouteRecord, from: RouteRecord, next: Function) {
    next((vm: SearchPage) => {
      vm.navigatedInternal = from.name !== null
    })
  }

  mounted() {
    if (this.$route.query.query) {
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
