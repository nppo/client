<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.project._id.edit.title', {
          name: project.title,
        })
      }}
    </h1>

    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="updateProject"
    >
      <div class="flex justify-between mb-6 space-x-32">
        <div class="w-6/12">
          <div class="flex flex-col mb-4">
            <label
              class="pl-3 mb-1"
              :for="$t('pages.project._id.edit.labels.title')"
            >
              {{ $t('pages.project._id.edit.labels.title') }}
            </label>
            <input
              :id="$t('pages.project._id.edit.labels.title')"
              v-model="projectData.title"
              class="p-3 font-bold rounded-md shadow focus:outline-none"
              type="text"
            />
          </div>

          <div class="flex flex-col mb-4">
            <label
              class="pl-3 mb-1"
              :for="$t('pages.project._id.edit.labels.description')"
            >
              {{ $t('pages.project._id.edit.labels.description') }}
            </label>
            <textarea
              :id="$t('pages.project._id.edit.labels.description')"
              v-model="projectData.description"
              rows="6"
              class="p-3 font-bold rounded-md shadow focus:outline-none"
            />
          </div>
        </div>
        <div class="w-6/12">
          <div class="flex flex-col mb-4">
            <label
              class="pl-3 mb-1"
              :for="$t('pages.project._id.edit.labels.purpose')"
            >
              {{ $t('pages.project._id.edit.labels.purpose') }}
            </label>
            <textarea
              :id="$t('pages.project._id.edit.labels.purpose')"
              v-model="projectData.purpose"
              rows="6"
              class="p-3 font-bold rounded-md shadow focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        class="self-start px-4 py-2 text-sm text-white rounded bg-orange-brand"
        type="submit"
      >
        {{ $t('general.save') }}
      </button>
    </form>
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
