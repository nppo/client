<template>
  <div>
    {{ project.description }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Project } from '~/types/entities'

@Component
export default class ProjectContent extends Vue {
  @Prop({ type: Object, required: true }) project!: Project
}
</script>
