<template>
  <div class="flex-1">
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
      <div class="relative grid grid-cols-4 gap-4 px-5 mb-16 lg:px-0">
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
              v-if="products.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.product.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('product')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="product in getMaxEntities(products, 6)"
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
              v-if="people.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.person.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('person')"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="person in getMaxEntities(people, 3)"
                  :key="person.id"
                >
                  <PersonBlock :person="person" />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="projects.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.project.plural')"
              class="mb-20"
              @show-all="setFilterByLabel('project')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="project in getMaxEntities(projects, 6)"
                  :key="project.id"
                >
                  <ProjectBlock :project="project" />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="parties.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.party.plural')"
              @show-all="setFilterByLabel('party')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="party in getMaxEntities(parties, 3)"
                  :key="party.id"
                >
                  <PartyBlock :party="party" />
                </div>
              </div>
            </SearchCollapse>

            <SearchCollapse
              v-if="articles.length > 0"
              :show-header="!hasSpecificTypeFilter"
              :header="$t('entities.article.plural')"
              @show-all="setFilterByLabel('article')"
            >
              <div
                class="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="article in getMaxEntities(articles, 6)"
                  :key="article.id"
                >
                  <ArticleBlock :article="article" />
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
import { Search, Type } from '~/types/entities'
import { Party, Person, Product, Project, Theme, Article } from '~/types/models'

import CollectionBlock from '~/components/Blocks/CollectionBlock.vue'
import ProductBlock from '~/components/Blocks/ProductBlock.vue'

@Component({
  async fetch(this: SearchPage) {
    await this.$accessor.themes.fetchIndex({ perPage: 100 })
    await this.$accessor.types.fetchAll()

    this.prepareFilters()

    await this.search()
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

  get current(): Search {
    return this.$accessor.search.current
  }

  get people(): Array<Person> {
    return this.current.people || []
  }

  get parties(): Array<Party> {
    return this.current.parties || []
  }

  get products(): Array<Product> {
    return this.current.products || []
  }

  get projects(): Array<Project> {
    return this.current.projects || []
  }

  get articles(): Array<Article> {
    return this.current.articles || []
  }

  get themes(): Array<Theme> {
    return this.$accessor.themes.all.items
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

      if (replaceUrl) {
        this.$router.replace('/search?' + requestString)
      }

      await this.$accessor.search.result(requestString)
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
}
</script>
