<template>
  <div class="flex space-x-1">
    <div
      class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
      @click="$emit('previous-slide')"
    >
      <font-awesome-icon class="text-base" icon="arrow-left" />
    </div>
    <div
      class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
      @click="$emit('next-slide')"
    >
      <font-awesome-icon class="text-base" icon="arrow-right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SliderArrows extends Vue {}
</script>
