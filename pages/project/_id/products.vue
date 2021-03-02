<template>
  <div class="container relative h-full px-16 mx-auto">
    <div class="grid grid-cols-4 gap-4 mb-2">
      <div class="col-span-3 mr-10">
        <div v-for="product in project" :key="product.id">
          {{ product.title }}
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Project } from '~/types/entities'

@Component
export default class ProjectProductsPage extends mixins(NavigationRouterHook) {
  @Prop({ type: Array, required: true }) project!: Project
}
</script>
