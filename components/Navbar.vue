<template>
  <nav class="flex items-center justify-between space-x-2 pt-5">
    <div class="text-white text-2xl">NPPO</div>

    <slot />

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

      <a href="/" class="bg-orange-600 px-4 py-2 text-white rounded">
        {{ $t('login') }}
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {}
</script>
