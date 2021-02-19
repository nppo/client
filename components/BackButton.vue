<template>
  <component
    :is="hasNavigatedInternal ? 'button' : 'NuxtLink'"
    v-bind="{
      ...(hasNavigatedInternal ? { type: 'button' } : { to: localePath('/') }),
    }"
    class="inline-flex items-center px-2 py-1 mt-8 space-x-2 text-white bg-blue-500 rounded"
    v-on="{
      ...(hasNavigatedInternal ? { click: () => this.$router.back() } : {}),
    }"
  >
    <font-awesome-icon class="block" icon="arrow-left" />
    <span>{{ $t('page.back') }}</span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BackButton extends Vue {
  @Prop({ required: true }) readonly hasNavigatedInternal!: Boolean
}
</script>
