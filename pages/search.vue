<template>
  <div class="flex-1">
    <Header has-search-bar class="mb-10">
      <div class="container pb-16">
        <button
          type="button"
          class="flex items-center px-2 py-1 mt-8 space-x-2 text-white bg-blue-500 rounded"
          @click="$router.back()"
        >
          <font-awesome-icon class="block" icon="arrow-left" />
          <span>{{ $t('page.back') }}</span>
        </button>

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

        <div class="mr-10">
          <h3 class="text-2xl mb-4">
            {{ $t('pages.search.filters.heading') }}
          </h3>
          <CheckboxFilter
            :name="'themes'"
            :entity="
              [...themes].sort((firstTheme, secondTheme) => {
                return isActive(firstTheme.id) ? -1 : 1
              })
            "
            @toggle-filter="toggleFilter"
          />
        </div>
        <div class="col-span-4 lg:col-span-3">
          <div v-if="isLoading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <div v-if="products.length > 0">
              <h2 class="mb-3 text-3xl">{{ $t('entities.product.plural') }}</h2>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

  get themes() {
    return this.$accessor.themes.all
  }

  get isLoading(): boolean {
    return this.$accessor.search.isLoading
  }

  get filters() {
    return this.$accessor.search.filters
  }

  isActive(id: any) {
    return this.filters.themes && this.filters.themes.includes(String(id))
  }

  toggleFilter(type: string, value: string) {
    this.$accessor.search.toggleFilter({ type, value })
    this.search()
  }

  setFilters(type: string, filters: Array<any>) {
    this.$accessor.search.setFilter({ type, values: filters })
  }

  async search(replaceUrl: boolean = false) {
    if (this.searchString || this.filters) {
      this.filterString = ''

      if (this.filters) {
        for (const filter in this.filters) {
          this.filters[filter].map(
            (value: any) =>
              (this.filterString += '&filters[' + filter + '][]=' + value)
          )
        }
      }

      const requestString = this.searchString
        ? 'query=' + this.searchString + this.filterString
        : this.filterString.substring(1)

      await this.$accessor.search.result(requestString)

      if (replaceUrl) {
        await this.$router.replace('/search?' + requestString)
      }
    }
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
      this.search(false)
    }

    if (this.themes.length < 1) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
