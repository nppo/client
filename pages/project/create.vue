<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <div class="flex items-center justify-between">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
      </div>

      <div class="mt-18">
        <h1 class="mb-6 text-4xl font-bold">
          {{ $t('pages.project.form.headings.create') }}
        </h1>

        <ValidationObserver>
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="create"
          >
            <div class="flex justify-between mb-6 space-x-32">
              <div class="w-6/12">
                <TextInput
                  :value.sync="formData.title"
                  :name="$t('pages.project.form.labels.title')"
                  :label="$t('pages.project.form.labels.title')"
                  :error-message="$t('validation.required')"
                  :has-errors.sync="titleError"
                />

                <div class="flex flex-col mb-4">
                  <label
                    class="pl-3 mb-1"
                    :for="$t('pages.project.form.labels.description')"
                  >
                    {{ $t('pages.project.form.labels.description') }}
                  </label>
                  <textarea
                    :id="$t('pages.project.form.labels.description')"
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
                    :for="$t('pages.project.form.labels.purpose')"
                  >
                    {{ $t('pages.project.form.labels.purpose') }}
                  </label>
                  <textarea
                    :id="$t('pages.project.form.labels.purpose')"
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
              {{ $t('actions.create') }}
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
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
    title: '',
    description: '',
    purpose: '',
  }

  private titleError: boolean = false

  create(): void {
    if (!this.titleError) {
      this.$accessor.projects.store(this.formData).then(() => {
        this.$router.push('/project/' + this.$accessor.projects.current.id)
      })
    }
  }
}
</script>
