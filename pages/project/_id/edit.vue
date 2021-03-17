<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.project._id.edit.title', {
          name: project.title,
        })
      }}
    </h1>

    <ValidationObserver>
      <form
        class="p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="updateProject"
      >
        <div class="flex justify-between mb-6 space-x-32">
          <div class="w-6/12">
            <TextInput
              :value.sync="projectData.title"
              :name="$t('pages.project._id.edit.labels.title')"
              :label="$t('pages.project._id.edit.labels.title')"
              :error-message="$t('validation.required')"
              :has-errors.sync="titleError"
            />

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

            <Multiselect
              :entity.sync="projectData.parties"
              :options="parties"
              :label="$t('pages.project._id.edit.labels.parties')"
              :error-message="$t('validation.required')"
              :has-errors.sync="partiesError"
              option-label-attribute="name"
            />
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
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Party, Project } from '~/types/models'

@Component({
  async asyncData({ $accessor }: Context) {
    await $accessor.parties.fetchAll()
  },
  components: {
    ValidationObserver,
  },
})
export default class ProjectEditPage extends mixins(NavigationRouterHook) {
  private projectData: Project = { ...this.project }
  private titleError: boolean = false
  private partiesError: boolean = false

  get project(): Project {
    return this.$accessor.projects.current
  }

  get parties(): Party[] {
    return this.$accessor.parties.all
  }

  updateProject(): void {
    if (!this.titleError) {
      this.$accessor.projects.update(this.projectData).then(() => {
        this.$router.push('/project/' + this.project.id)
      })
    }
  }

  mounted() {
    if (this.$gates.unlessPermission('update projects')) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }

    if (!this.project.can?.update) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }
  }
}
</script>
