<template>
  <div class="mt-18">
    <h1 class="pb-6 text-4xl font-bold">Edit {{ project.title }}</h1>

    <div class="h-full p-4 overflow-hidden bg-white rounded-md shadow">
      <form class="flex flex-col" @submit.prevent="updateProject">
        <div class="flex flex-col mb-4">
          <label>{{ $t('pages.project._id.headings.title') }}</label>
          <input
            v-model="projectData.title"
            class="w-6/12 p-3 font-bold rounded-md shadow focus:outline-none"
            type="text"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label>{{ $t('pages.project._id.headings.description') }}</label>
          <textarea
            v-model="projectData.description"
            class="w-6/12 p-3 font-bold rounded-md shadow focus:outline-none"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label>{{ $t('pages.project._id.headings.purpose') }}</label>
          <textarea
            v-model="projectData.purpose"
            class="w-6/12 p-3 font-bold rounded-md shadow focus:outline-none"
          />
        </div>

        <button
          class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
          type="submit"
        >
          {{ $t('general.save') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Project } from '~/types/entities'

@Component
export default class ProjectEditPage extends mixins(NavigationRouterHook) {
  private projectData: Project = { ...this.project }

  get project(): Project {
    return this.$accessor.projects.current
  }

  updateProject(): void {
    this.$accessor.projects.update(this.projectData).then(() => {
      this.$router.push('/project/' + this.project.id)
    })
  }
}
</script>
