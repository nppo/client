<template>
  <div class="-mt-20">
    <div
      class="flex justify-end mb-12"
      :class="{ invisible: projects.length <= 4 }"
    >
      <div
        class="flex justify-center w-8 h-8 p-2 mr-3 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="$refs.slider.previous()"
      >
        <font-awesome-icon class="text-base" icon="arrow-left" />
      </div>

      <div
        class="flex justify-center w-8 h-8 p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
        @click="$refs.slider.next()"
      >
        <font-awesome-icon class="text-base" icon="arrow-right" />
      </div>
    </div>

    <BlockSlider v-if="projects" ref="slider">
      <div v-for="project in projects" :key="project.id" class="h-full px-2">
        <ProjectBlock class="shadow-none" :project="project" />
      </div>
    </BlockSlider>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Project } from '~/types/entities'

@Component
export default class ProjecttSlider extends Vue {
  @Prop({ type: Array, required: true }) projects!: Project[]
}
</script>
