<template>
  <NuxtLink v-bind="{ to: localePath(path), ...$attrs }">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LocaleLink extends Vue {
  @Prop({ type: [String, Object], required: true }) readonly path!:
    | string
    | object
}
</script>
