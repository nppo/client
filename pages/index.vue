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
              <ThemeFilter @set-filters="setFilters" />
            </SearchBar>
          </form>
        </div>
      </div>
    </Header>

    <div class="container relative mx-auto">
      <div class="grid grid-cols-1 gap-5 -mt-28 md:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="(block, index) in searchBlocks"
          :key="index"
          to="/"
          class="block p-5 bg-white rounded shadow"
        >
          <div class="font-bold">
            {{ $t('pages.index.search_blocks.title') }}
          </div>

          <h3 class="text-2xl font-medium">{{ block.title }}</h3>

          <p class="text-xs">
            {{ block.description }}
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
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { LocaleMessageArray } from 'vue-i18n/types'

@Component
export default class IndexPage extends Vue {
  private searchQuery: string = ''
  private activeFilters: Array<any> = []
  private searchBlocks: LocaleMessageArray = this.$t(
    'pages.index.search_blocks.items'
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilters(type: string, filters: Array<any>) {
    this.activeFilters = filters
    // TODO implement store in SURAPP-173
  }

  handleSubmitEvent() {
    const query = { query: this.searchQuery } as any

    if (this.activeFilters.length) {
      query.filters = encodeURIComponent(
        JSON.stringify({ themes: this.activeFilters })
      )
    }

    this.$router.push({
      path: 'search',
      query,
    })
  }
}
</script>
