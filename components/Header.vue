<template>
  <div class="relative">
    <img
      src="~/assets/img/bg.jpg"
      alt=""
      class="absolute inset-0 object-cover w-full h-full"
    />

    <div class="relative inset-0 bg-blue-800 bg-opacity-50">
      <div class="container relative h-full mx-auto">
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
