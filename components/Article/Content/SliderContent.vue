<template>
  <div class="w-full">
    <!-- @TODO SURAPP-303: Include slider here -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SliderContent extends Vue {
  private index: null | number = null

  @Prop({ type: Object, required: true }) data!: object
}
</script>
