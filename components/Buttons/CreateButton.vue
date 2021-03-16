<template>
  <LocaleLink
    :path="`/${page}/create`"
    class="inline-flex items-center px-2 py-1 space-x-2 font-bold text-blue-500 border border-blue-500 rounded-md"
  >
    <font-awesome-icon class="block" icon="plus" />

    <span>{{ $t('actions.create') }}</span>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CreateButton extends Vue {
  @Prop({ type: String, required: true }) readonly page!: string
}
</script>
