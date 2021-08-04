<template>
  <div>
    <span
      v-for="(error, index) in errors"
      :key="index"
      class="pl-3 text-red-500"
    >
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Errors extends Vue {
  @Prop({ type: Array }) errors!: Array<string>
}
</script>
