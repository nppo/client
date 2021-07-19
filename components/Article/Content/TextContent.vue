<template>
  <div class="w-full">
    <!-- @TODO SURAPP-301: Render the text (which is markdown) -->
    <div v-html="$md.render(data.text)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class TextContent extends Vue {
  private index: null | number = null

  @Prop({ type: Object, required: true }) data!: object
}
</script>
