<template>
  <td class="px-6 py-6">
    <slot />
  </td>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TableValue extends Vue {}
</script>
