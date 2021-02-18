<template>
  <div :class="hiddenClass">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Hide extends Vue {
  @Prop({ type: Boolean }) hide!: boolean

  get hiddenClass(): string {
    if (!this.hide) {
      return ''
    }
    return 'hidden'
  }
}
</script>
