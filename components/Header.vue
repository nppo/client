<template>
  <div class="relative">
    <img
      src="~/assets/img/bg.jpg"
      alt=""
      class="absolute h-full inset-0 object-cover w-full"
    />

    <div class="relative bg-blue-800 bg-opacity-50 inset-0">
      <div class="container h-full mx-auto relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {}
</script>
