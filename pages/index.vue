<template>
  <div class="flex-1">
    <Header class="mb-8">
      <div class="pb-2 lg:pb-32">
        <Navbar />

        <div class="text-white text-center mt-32">
          <h1 class="text-4xl font-bold">{{ $t('pages.index.title') }}</h1>
          <h2 class="font-medium">
            {{ $t('pages.index.subtitle') }}
          </h2>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:absolute bottom-0 gap-5 -mb-8"
        >
          <a
            v-for="(block, index) in searchBlocks"
            :key="index"
            href="/"
            class="block bg-white p-5 rounded"
          >
            <div class="font-bold">
              {{ $t('pages.index.search_blocks.title') }}
            </div>

            <h3 class="font-medium text-2xl">{{ block.title }}</h3>

            <p class="text-xs">
              {{ block.description }}
            </p>

            <div class="flex justify-end">
              <svg
                viewBox="0 0 13 13"
                class="fill-current text-orange-400 h-3 w-3"
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
  private searchBlocks: LocaleMessageArray = this.$t(
    'pages.index.search_blocks.items'
  )

  mounted() {
    // this.redirect()
  }
}
</script>
