<template>
  <div class="flex-1">
    <div class="relative mb-8">
      <img
        src="~/assets/img/bg.jpg"
        alt=""
        class="absolute h-full inset-0 object-cover w-full"
      />

      <div class="relative bg-blue-800 bg-opacity-50 inset-0">
        <div class="container h-full mx-auto relative pb-32">
          <nav class="flex items-center justify-between pt-5">
            <div class="text-white text-2xl">NPPO</div>

            <div class="flex space-x-2">
              <button class="bg-white p-2 rounded flex items-center space-x-2">
                <span>NL</span>
                <svg
                  class="fill-current h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 8 9"
                >
                  <path
                    d="M7.464 3.827l.407.446a.513.513 0 010 .68L4.31 8.858a.411.411 0 01-.62 0L.128 4.953a.513.513 0 010-.68l.407-.446a.414.414 0 01.628.008l2.103 2.42V.482c0-.267.196-.482.44-.482h.586c.244 0 .44.215.44.482v5.773l2.103-2.42a.41.41 0 01.628-.008z"
                  />
                </svg>
              </button>
              <a href="/" class="bg-orange-600 p-2 text-white rounded">
                {{ $t('login') }}
              </a>
            </div>
          </nav>

          <div class="text-white text-center mt-32">
            <h1 class="text-4xl font-bold">{{ $t('pages.index.title') }}</h1>
            <h2 class="font-medium">
              {{ $t('pages.index.subtitle') }}
            </h2>
          </div>

          <div class="grid grid-cols-4 absolute bottom-0 gap-5 -mb-8">
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
      </div>
    </div>
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
