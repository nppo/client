<template>
  <div class="flex-1" @scroll="detectLoadMore">
    <Header>
      <div class="container pb-16">
        <BackButton
          class="mt-8"
          :has-navigated-internal="hasNavigatedInternal"
        />

        <h1 class="mt-8 text-4xl font-bold text-gray-100">
          {{ $t('pages.search.title') }}
        </h1>
      </div>
    </Header>

    <div class="container mx-auto -mt-6">
      <div class="relative grid grid-cols-4 gap-4 mb-16">
        <SearchBar
          :aria-label="$t('pages.search.input_search')"
          variant="large"
          :value.sync="searchString"
          class="col-span-3 col-start-2 mb-10"
          @click="search(true)"
        />

        <div v-if="$fetchState.pending">
          <FilterSkeleton class="mb-1 mr-10" />
        </div>
        <div v-else class="mr-10">
          <h3 class="mb-4 text-2xl">
            {{ $t('pages.search.filters.heading') }}
          </h3>

          <CheckboxFilter
            :name="'types'"
            :requires-translation="true"
            :entities="types"
            class="mb-1"
            @toggle-filter="toggleFilter"
          />

          <CheckboxFilter
            :name="'themes'"
            :entities="themes"
            @toggle-filter="toggleFilter"
          />
        </div>

        <div class="col-span-4 pt-10 lg:col-span-3">
          <div v-if="$fetchState.pending || isLoading">
            <SearchSkeleton />
          </div>
          <div v-else>
            <SearchCollapse
              v-if="products.items.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.product.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('product')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="product in getMaxEntities(products.items, 6)"
                  :key="product.id"
                >
                  <component
                    :is="
                      product.children.length > 0
                        ? 'CollectionBlock'
                        : 'ProductBlock'
                    "
                    :product="product"
                  />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="people.items.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.person.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('person')"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="person in getMaxEntities(people.items, 3)"
                  :key="person.id"
                >
                  <PersonBlock :person="person" />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="projects.items.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.project.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('project')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="project in getMaxEntities(projects.items, 6)"
                  :key="project.id"
                >
                  <ProjectBlock :project="project" />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="parties.items.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.party.plural')"
              @show-all="setFilterByLabel('party')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="party in getMaxEntities(parties.items, 3)"
                  :key="party.id"
                >
                  <PartyBlock :party="party" />
                </div>
              </div>
            </SearchCollapse>

            <div v-if="showInfiniteLoader" class="-mt-16">
              <SearchSkeleton />
            </div>

            <div
              v-if="resourceDepleted"
              class="-mt-12 text-xl text-center text-gray-500"
            >
              That's all folks!
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
import { Component, mixins } from 'nuxt-property-decorator'
import qs from 'qs'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Search, SearchResultItem, Type } from '~/types/entities'
import { Party, Person, Product, Project, Theme } from '~/types/models'

import CollectionBlock from '~/components/Blocks/CollectionBlock.vue'
import ProductBlock from '~/components/Blocks/ProductBlock.vue'
import filterTypes, {
  filterTypesKeys,
  filterTypesValues,
} from '~/config/entities'

@Component({
  async fetch(this: SearchPage) {
    window.addEventListener('scroll', this.detectLoadMore)

    await this.$accessor.themes.fetchAll()
    await this.$accessor.types.fetchAll()

    this.prepareFilters()

    if (
      !this.hasSpecificTypeFilter ||
      (this.hasSpecificTypeFilter && Object.keys(this.current).length === 0) ||
      (this.hasSpecificTypeFilter &&
        this.current[this.getSpecificTypeFilter]?.items.length === 0)
    ) {
      await this.search()
      this.resourceDepleted = false
    }
  },
  components: {
    CollectionBlock,
    ProductBlock,
  },
})
export default class SearchPage extends mixins(NavigationRouterHook) {
  private searchString: string = ''
  private filterString: string = ''
  private isLoading: boolean = false
  private hasScrolled: boolean = false
  private showInfiniteLoader: boolean = false
  private resourceDepleted: boolean = false

  get current(): Search {
    return this.$accessor.search.current
  }

  get people(): SearchResultItem<Person> | undefined {
    return this.current.people
  }

  get parties(): SearchResultItem<Party> | undefined {
    return this.current.parties
  }

  get products(): SearchResultItem<Product> | undefined {
    return this.current.products
  }

  get projects(): SearchResultItem<Project> | undefined {
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

  get hasSpecificTypeFilter(): boolean {
    return this.filters.types?.length === 1
  }

  get getSpecificTypeFilter(): filterTypesValues {
    const typeFilter = this.filters.types[0] as filterTypesKeys
    return filterTypes[typeFilter]
  }

  get requestString(): string {
    return this.searchString
      ? 'query=' + this.searchString + this.filterString
      : this.filterString
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

      if (replaceUrl) {
        this.$router.replace('/search?' + this.requestString)
      }

      await this.$accessor.search.result(this.requestString)
    }

    this.isLoading = false
  }

  prepareFilters(): void {
    let queryString: string

    if (this.$i18n.locale !== this.$i18n.defaultLocale) {
      queryString = this.$route.fullPath.replace(
        '/' + this.$i18n.locale + '/search?',
        ''
      )
    } else {
      queryString = this.$route.fullPath.replace('/search?', '')
    }

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

      for (const filter in this.filters) {
        this.filters[filter].map(
          (value: any) =>
            (this.filterString += '&filters[' + filter + '][]=' + value)
        )
      }
    }
  }

  setFilterByLabel(label: string): void {
    const id = this.types.find((type) => type.label === label)?.id

    if (!id) {
      return
    }

    this.typesFilter(String(id))
  }

  typesFilter(type: string): void {
    this.setFilters('types', [String(type)])
    this.search(true)
  }

  getMaxEntities(entities: Array<any>, max: number): Array<any> {
    return this.hasSpecificTypeFilter ? entities : entities.slice(0, max)
  }

  detectLoadMore() {
    this.hasScrolled = true

    if (!this.hasSpecificTypeFilter || this.showInfiniteLoader) return

    const nextCursor = this[this.getSpecificTypeFilter]?.nextCursor

    if (!nextCursor) {
      this.resourceDepleted = true
      return
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.showInfiniteLoader = true

      const searchString: string = this.requestString + '&cursor=' + nextCursor

      this.$accessor.search
        .additionalResults({ searchString, type: this.getSpecificTypeFilter })
        .then(() => {
          this.showInfiniteLoader = false
        })
    }
  }

  updated() {
    if (!this.hasScrolled) {
      this.$nextTick(() => {
        window.scrollTo(0, this.$accessor.search.scrollState)
      })
    }
  }

  beforeDestroy() {
    this.$accessor.search.setScrollState(window.scrollY)
    window.removeEventListener('scroll', this.detectLoadMore)
  }
}
</script>
