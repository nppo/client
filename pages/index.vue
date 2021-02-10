<template>
  <div class="flex-1">
    <Header class="mb-8">
      <div class="pb-2 lg:pb-32">
        <Navbar>
          <form
            class="flex justify-end flex-1 pr-24"
            @submit.prevent="handleSubmitEvent"
          >
            <SearchBar
              :value.sync="searchQuery"
              variant="alternative"
            ></SearchBar>
          </form>
        </Navbar>

        <div class="mt-32 text-center text-white">
          <h1 class="text-4xl font-bold">{{ $t('pages.index.title') }}</h1>
          <h2 class="font-medium">
            {{ $t('pages.index.subtitle') }}
          </h2>
        </div>

        <div class="grid grid-cols-8">
          <form
            class="col-span-6 col-start-2 mt-10 mb-20"
            @submit.prevent="handleSubmitEvent"
          >
            <SearchBar :value.sync="searchQuery" variant="main">
              <div class="flex pr-6 space-x-2">
                <div
                  class="flex items-center px-2 py-1 space-x-5 font-bold shadow-input"
                >
                  <span>Type</span>
                  <svg
                    class="w-3 h-3 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 9"
                  >
                    <path
                      d="M7.464 3.827l.407.446a.513.513 0 010 .68L4.31 8.858a.411.411 0 01-.62 0L.128 4.953a.513.513 0 010-.68l.407-.446a.414.414 0 01.628.008l2.103 2.42V.482c0-.267.196-.482.44-.482h.586c.244 0 .44.215.44.482v5.773l2.103-2.42a.41.41 0 01.628-.008z"
                    />
                  </svg>
                </div>

                <div
                  class="flex items-center px-2 py-1 space-x-5 font-bold shadow-input"
                >
                  <span>Thema</span>
                  <svg
                    class="w-3 h-3 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 9"
                  >
                    <path
                      d="M7.464 3.827l.407.446a.513.513 0 010 .68L4.31 8.858a.411.411 0 01-.62 0L.128 4.953a.513.513 0 010-.68l.407-.446a.414.414 0 01.628.008l2.103 2.42V.482c0-.267.196-.482.44-.482h.586c.244 0 .44.215.44.482v5.773l2.103-2.42a.41.41 0 01.628-.008z"
                    />
                  </svg>
                </div>
              </div>
            </SearchBar>
          </form>
        </div>

        <div
          class="bottom-0 grid grid-cols-1 gap-5 -mb-8 md:grid-cols-2 lg:grid-cols-4 lg:absolute"
        >
          <a
            v-for="(block, index) in searchBlocks"
            :key="index"
            href="/"
            class="block p-5 bg-white rounded"
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
                class="w-3 h-3 text-orange-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.527.804l.644-.61a.721.721 0 01.984 0l5.64 5.339a.632.632 0 010 .931l-5.64 5.342a.721.721 0 01-.984 0l-.644-.61a.636.636 0 01.012-.942l3.496-3.155H.696C.31 7.1 0 6.805 0 6.44V5.56c0-.365.31-.66.696-.66h8.34L5.538 1.747a.632.632 0 01-.012-.942z"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </Header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { LocaleMessageArray } from 'vue-i18n/types'

@Component
export default class IndexPage extends Vue {
  private searchQuery: string = ''
  private searchBlocks: LocaleMessageArray = this.$t(
    'pages.index.search_blocks.items'
  )

  handleSubmitEvent() {
    this.$router.push({ path: 'search', query: { query: this.searchQuery } })
  }
}
</script>
