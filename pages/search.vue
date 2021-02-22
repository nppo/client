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
          class="col-span-3 col-start-2 mb-10"
          @click="search(true)"
        />

        <div class="mr-10">
          <h3 class="mb-4 text-2xl">
            {{ $t('pages.search.filters.heading') }}
          </h3>

          <CheckboxFilter
            :name="'types'"
            :requires-translation="true"
            :entity="
              [...types].sort((type) => {
                return isActive(type.id, 'types') ? -1 : 1
              })
            "
            class="mb-1"
            @toggle-filter="toggleFilter"
          />

          <CheckboxFilter
            :name="'themes'"
            :entity="
              [...themes].sort((theme) => {
                return isActive(theme.id, 'themes') ? -1 : 1
              })
            "
            @toggle-filter="toggleFilter"
          />
        </div>
        <div class="col-span-4 pt-10 lg:col-span-3">
          <div v-if="isLoading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <SearchCollapse
              v-if="products && products.length > 0"
              :show-header="!hasSpecificTypeFilter()"
              :header="$t('entities.product.plural')"
              class="mb-20"
              @show-all="
                typesFilter(
                  types.find((type) => {
                    return type.label === 'product'
                  }).id
                )
              "
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="product in getMaxEntities(products, 6)"
                  :key="product.id"
                >
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
              @show-all="
                typesFilter(
                  types.find((type) => {
                    return type.label === 'party'
                  }).id
                )
              "
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="party in getMaxEntities(products, 3)"
                  :key="party.id"
                >
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
import {
  Party,
  Person,
  Product,
  Project,
  Search,
  Theme,
  Type,
} from '~/types/entities'

@Component({
  async fetch(this: SearchPage) {
    this.$accessor.themes.fetchAll()

    this.$accessor.types.fetchAll()

    await this.search()
  },
})
export default class SearchPage extends mixins(NavigationRouterHook) {
  private searchString: string = ''
  private filterString: string = ''
  private isLoading: boolean = false

  get current(): Search {
    return this.$accessor.search.current
  }

  get people(): Array<Person> | undefined {
    return this.current.people
  }

  get parties(): Array<Party> | undefined {
    return this.current.parties
  }

  get products(): Array<Product> | undefined {
    return this.current.products
  }

  get projects(): Array<Project> | undefined {
    return this.current.projects
  }

  get themes(): Array<Theme> {
    return this.$accessor.themes.all
  }

  get types(): Array<Type> {
    return this.$accessor.types.all
  }

  get filters() {
    return this.$accessor.search.filters
  }

  isActive(id: any, type: string): boolean {
    return this.filters[type] && this.filters[type].includes(String(id))
  }

  toggleFilter(type: string, value: string): void {
    this.$accessor.search.toggleFilter({ type, value })
    this.search(true)
  }

  setFilters(type: string, filters: Array<any>): void {
    this.$accessor.search.setFilter({ type, values: filters })
  }

  async search(replaceUrl: boolean = false): Promise<void> {
    this.isLoading = true

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

      const requestString: string = this.searchString
        ? 'query=' + this.searchString + this.filterString
        : this.filterString.substring(1)

      await this.$accessor.search.result(requestString)

      if (replaceUrl) {
        await this.$router.replace('/search?' + requestString)
      }
    }

    this.isLoading = false
  }

  mounted(): void {
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
  }

  hasSpecificTypeFilter(): boolean {
    if (this.filters.types) {
      return this.filters.types.length === 1
    }

    return false
  }

  typesFilter(type: string): void {
    this.setFilters('types', [String(type)])
    this.search(true)
  }

  getMaxEntities(entities: Array<any>, max: number): Array<any> {
    return this.hasSpecificTypeFilter() ? entities : entities.slice(0, max)
  }
}
</script>
