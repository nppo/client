<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h2 class="mb-2 text-3xl">
        {{ $t('types.product') }}
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="product in projectContent" :key="product.id">
        <ProductBlock :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Product } from '~/types/entities'

@Component
export default class ProjectProductsPage extends Vue {
  @Prop({ type: Array, required: true }) projectContent!: Product
}
</script>
