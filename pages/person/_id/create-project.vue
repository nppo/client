<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{ $t('pages.project._id.headings.create_project') }}
    </h1>

    <ValidationObserver>
      <form
        class="p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="createProject"
      >
        <div class="flex justify-between mb-6 space-x-32">
          <div class="w-6/12">
            <TextInput
              :value.sync="formData.title"
              :name="$t('pages.project._id.form.labels.title')"
              :label="$t('pages.project._id.form.labels.title')"
              :error-message="$t('validation.required')"
              :has-errors.sync="titleError"
            />

            <div class="flex flex-col mb-4">
              <label
                class="pl-3 mb-1"
                :for="$t('pages.project._id.form.labels.description')"
              >
                {{ $t('pages.project._id.form.labels.description') }}
              </label>
              <textarea
                :id="$t('pages.project._id.form.labels.description')"
                v-model="formData.description"
                rows="6"
                class="p-3 font-bold rounded-md shadow focus:outline-none"
              />
            </div>
          </div>
          <div class="w-6/12">
            <div class="flex flex-col mb-4">
              <label
                class="pl-3 mb-1"
                :for="$t('pages.project._id.form.labels.purpose')"
              >
                {{ $t('pages.project._id.form.labels.purpose') }}
              </label>
              <textarea
                :id="$t('pages.project._id.form.labels.purpose')"
                v-model="formData.purpose"
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
          {{ $t('general.create') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class ProjectCreatePage extends mixins(NavigationRouterHook) {
  private formData: any = {
    id: this.$auth.user.person.id,
    title: null,
    description: null,
    purpose: null,
  }

  private titleError: boolean = false

  createProject(): void {
    if (!this.titleError) {
      this.$repositories.project.store(this.formData).then(() => {
        this.$accessor.people
          .fetchCurrent(this.$auth.user.person.id)
          .then(() => {
            this.$router.push('/person/' + this.$auth.user.person.id)
          })
      })
    }
  }
}
</script>
