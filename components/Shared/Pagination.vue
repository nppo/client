<template>
  <div>
    <a
      v-for="page in total"
      :key="page"
      class="flex items-center justify-center border-2 rounded-full cursor-pointer h-14 w-14"
      :class="
        page === current
          ? 'text-red-brand border-red-brand'
          : 'border-transparent hover:border-gray-200 text-black'
      "
      @click.prevent="handlePaginationClick(page)"
    >
      <div>{{ page }}</div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Paginator extends Vue {
  @Prop({ type: Number }) readonly current!: number
  @Prop({ type: Number }) readonly total!: number

  handlePaginationClick(page: number): void {
    if (page !== this.current) {
      this.$emit('changed', page)
    }
  }
}
</script>
