<template>
  <div class="flex-1">
    <Header>
      <div class="container pb-16">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />

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
            <SearchCollapse
              v-if="products && products.length > 0"
              :show-header="!hasSpecificTypeFilter()"
              :header="$t('entities.product.plural')"
              class="mb-20"
              @show-all="typesFilter('product')"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="product in products.slice(0, 6)" :key="product.id">
                  <ProductBlock :product="product" />
                </div>
              </div>
            </SearchCollapse>

            <div v-if="people && people.length > 0" class="mb-20">
              <h2 class="mb-3 text-3xl">{{ $t('entities.person.plural') }}</h2>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="person in people" :key="person.id">
                  {{ person.id }}
                </div>
              </div>
            </div>

            <div v-if="projects && projects.length > 0" class="mb-20">
              <h2 class="mb-3 text-3xl">{{ $t('entities.project.plural') }}</h2>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="project in projects" :key="project.id">
                  {{ project.id }}
                </div>
              </div>
            </div>

            <SearchCollapse
              v-if="parties && parties.length > 0"
              :show-header="!hasSpecificTypeFilter()"
              :header="$t('entities.party.plural')"
              @show-all="typesFilter('party')"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="party in parties" :key="party.id">
                  <PartyBlock :party="party" />
                </div>
              </div>
            </SearchCollapse>

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
import { Component, mixins } from 'nuxt-property-decorator'
import qs from 'qs'
import NavigationRouterHook from '~/mixins/navigation-router-hook'

@Component
export default class SearchPage extends mixins(NavigationRouterHook) {
  private searchString: string = ''
  private filterString: string = ''
  private isLoading: boolean = false
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
    this.isLoading = true

    if (this.searchString || this.filterString) {
      const requestString: string = this.searchString
        ? 'query=' + this.searchString + this.filterString
        : this.filterString.substring(1)

      if ((this.$route.query.query as string) !== this.searchString) {
        this.$router.replace({ path: `${this.$route.path}?${requestString}` })
      }

      await this.$accessor.search.result(requestString)
    }

    this.isLoading = false
  }

  mounted() {
    const queryString = this.$route.fullPath.replace('/search?', '')

    const query = qs.parse(queryString) as any

    if (query.query) {
      this.searchString = this.$route.query.query.toString()
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

  hasSpecificTypeFilter(): boolean {
    if (this.filters.types) {
      return this.filters.types.length > 0
    }

    return false
  }

  typesFilter(type: string): void {
    this.setFilters('types', [type])
    this.search()
  }
}
</script>
