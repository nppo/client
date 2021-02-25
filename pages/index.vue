<template>
  <div class="flex-1">
    <Header>
      <div>
        <div class="mt-32 text-center text-white">
          <h1 class="text-4xl font-bold">{{ $t('pages.index.title') }}</h1>
          <h2 class="font-medium">
            {{ $t('pages.index.subtitle') }}
          </h2>
        </div>

        <div class="grid grid-cols-8 pb-48">
          <form
            class="col-span-6 col-start-2 mt-10 mb-20"
            @submit.prevent="handleSubmitEvent"
          >
            <SearchBar :value.sync="searchQuery" variant="large">
              <TypeFilter @set-filters="setFilters" />
              <ThemeFilter :themes="themes" @set-filters="setFilters" />
            </SearchBar>
          </form>
        </div>
      </div>
    </Header>

    <div class="container relative mx-auto">
      <div class="grid grid-cols-1 gap-5 -mt-28 md:grid-cols-2 lg:grid-cols-4">
        <LocaleLink
          v-for="(type, index) in types"
          :key="index"
          :path="'/search?filters[types][]=' + type.id"
          class="block p-5 bg-white rounded shadow"
        >
          <div class="font-bold">
            {{ $t('pages.index.search_blocks.title') }}
          </div>

          <h3 class="text-2xl font-medium">
            {{ $t('pages.index.search_blocks.' + type.label + '.title') }}
          </h3>

          <p class="text-xs">
            {{ $t('pages.index.search_blocks.' + type.label + '.description') }}
          </p>

          <div class="flex justify-end">
            <svg
              viewBox="0 0 13 13"
              class="w-3 h-3 fill-current text-orange-brand"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.527.804l.644-.61a.721.721 0 01.984 0l5.64 5.339a.632.632 0 010 .931l-5.64 5.342a.721.721 0 01-.984 0l-.644-.61a.636.636 0 01.012-.942l3.496-3.155H.696C.31 7.1 0 6.805 0 6.44V5.56c0-.365.31-.66.696-.66h8.34L5.538 1.747a.632.632 0 01-.012-.942z"
              />
            </svg>
          </div>
        </LocaleLink>
      </div>
    </div>

    <ThemeFilterSection :themes="themes" />

    <DiscoverSection
      :types="types"
      :entities="entities"
      :fetch="$fetchState.pending"
    />

    <div class="container relative py-24 mx-auto">
      <h3 class="mb-12 text-2xl font-bold text-center">
        {{ $t('pages.index.statistics_title') }}
      </h3>

      <div class="flex justify-around space-x-5">
        <div
          v-for="statistic in entityStatistics"
          :key="statistic.name"
          class="flex flex-col items-center"
        >
          <div
            class="text-4xl font-bold text-blue-500"
            :title="statistic.count"
          >
            {{ statistic.count.toLocaleString($i18n.locale) }}
          </div>
          <div class="text-base capitalize">
            {{ $tc(`entities.${statistic.name}.default`, statistic.count) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import qs from 'qs'
import { Type, Filter } from '~/types/entities'

@Component({
  async fetch(this: IndexPage) {
    const {
      data: { data },
    } = await this.$repositories.statistics.entities()

    this.entityStatistics = data
    if (this.$accessor.types.all.length < 1) {
      await this.$accessor.types.fetchAll()
    }

    await this.$accessor.themes.fetchAll()
    await this.$accessor.discover.fetchAll()
  },
})
export default class IndexPage extends Vue {
  private searchQuery: string = ''
  private entityStatistics: Object[] = []

  get filters(): Array<Filter[]> {
    return this.$accessor.search.filters
  }

  get types(): Type[] {
    return this.$accessor.types.all
  }

  get themes() {
    return this.$accessor.themes.all
  }

  get entities() {
    return this.$accessor.discover.all
  }

  setFilters(type: string, filters: Array<any>): void {
    this.$accessor.search.setFilter({ type, values: filters })
  }

  handleSubmitEvent(): void {
    if (this.searchQuery || this.filters) {
      const query = {
        query: this.searchQuery,
        filters: qs.stringify({ ...this.filters }, { encode: false }),
      }

      this.$router.push({
        path: 'search',
        query,
      })
    }
  }

  mounted(): void {
    this.$accessor.search.resetSearch()
  }
}
</script>
