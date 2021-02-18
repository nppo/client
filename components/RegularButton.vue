<template>
  <div
    class="px-2 py-1 font-bold text-blue-500 border-blue-500 rounded-md cursor-pointer border-1"
    @click.prevent="clicked"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class RegularButton extends Vue {
  @Prop({ type: String }) text!: string

  clicked() {
    this.$emit('click')
  }
}
</script>
