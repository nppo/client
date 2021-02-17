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
        <div />
        <div class="col-span-4 lg:col-span-3">
          <div v-if="loading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <div v-if="products.length > 0">
              <h2 class="text-3xl mb-3">{{ $t('entities.product.plural') }}</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="product in products" :key="product.id">
                  <ProductBlock :product="product" />
                </div>
              </div>
            </div>

            <div v-if="people.length > 0">
              <h2 class="text-3xl mb-3">{{ $t('entities.person.plural') }}</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="person in people" :key="person.id">
                  {{ person.id }}
                </div>
              </div>
            </div>

            <div v-if="projects.length > 0">
              <h2 class="text-3xl mb-3">{{ $t('entities.project.plural') }}</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="project in projects" :key="project.id">
                  {{ project.id }}
                </div>
              </div>
            </div>

            <div v-if="parties.length > 0">
              <h2 class="text-3xl mb-3">{{ $t('entities.party.plural') }}</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="party in parties" :key="party.id">
                  {{ party.id }}
                </div>
              </div>
            </div>

            <div v-if="current.results === 0">
              {{ $t('pages.search.no_results') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import qs from 'qs'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''
  private filterString: string = ''
  private loading: boolean = false
  private activeFilters: Array<any> = []

  get people() {
    return this.$accessor.search.current.people
  }

  get parties() {
    return this.$accessor.search.current.parties
  }

  get products() {
    return this.$accessor.search.current.products
  }

  get projects() {
    return this.$accessor.search.current.projects
  }

  get current() {
    return this.$accessor.search.current
  }

  get filters() {
    return this.$accessor.search.filters
  }

  setFilters(type: string, filters: Array<any>) {
    this.$accessor.search.setFilter({ type, values: filters })
    this.filterString = ''

    if (this.filters) {
      for (const filter in this.filters) {
        this.filters[filter].map(
          (value: any) =>
            (this.filterString += '&filters[' + filter + '][]=' + value)
        )
      }
    }
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
    const queryString = this.$route.fullPath.replace('/search?', '')

    const query = qs.parse(queryString) as any

    if (query.query) {
      this.searchString = this.$route.query.query as string
    }

    if (query.filters) {
      const filters = qs.parse(query.filters)

      for (const type in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, type)) {
          this.setFilters(type, filters[type] as any)
        }
      }
    }

    if (this.searchString || this.filters) {
      this.search()
    }
  }
}
</script>
