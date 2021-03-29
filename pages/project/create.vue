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

        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="handleSubmit(create)"
          >
            <div class="flex justify-between mb-6 space-x-32">
              <div class="flex flex-col mb-4">
                <label
                  :for="$t('pages.project.form.labels.project_picture')"
                  class="pl-3 mb-1"
                >
                  {{ $t('pages.project.form.labels.project_picture') }}
                </label>

                <input
                  :id="$t('pages.project.form.labels.project_picture')"
                  class="px-3 py-3 font-bold rounded-md shadow focus:outline-none"
                  type="file"
                  @change="projectPictureSelected"
                />
              </div>
            </div>

            <div class="flex justify-between mb-6 space-x-32">
              <div class="w-6/12">
                <TextInput
                  :value.sync="formData.title"
                  :name="$t('pages.project.form.labels.title')"
                  :label="$t('pages.project.form.labels.title')"
                  :required="true"
                  :error-message="$t('validation.required')"
                  :has-errors.sync="titleError"
                />

                <Textarea
                  :value.sync="formData.description"
                  :name="$t('pages.project.form.labels.description')"
                  :label="$t('pages.project.form.labels.description')"
                />

                <Multiselect
                  :entity.sync="formData.parties"
                  :options="parties"
                  :label="$t('pages.project.form.labels.parties')"
                  option-label-attribute="name"
                />

                <Multiselect
                  :entity.sync="formData.products"
                  :options="relatedProducts"
                  :label="$t('pages.project.form.labels.products')"
                  option-label-attribute="title"
                />
              </div>
              <div class="w-6/12">
                <Textarea
                  :value.sync="formData.purpose"
                  :name="$t('pages.project.form.labels.purpose')"
                  :label="$t('pages.project.form.labels.purpose')"
                />
              </div>
            </div>

            <div class="mb-6">
              <h2 class="mb-4 text-3xl font-bold">
                {{ $t('pages.project.create.headings.metadata') }}
              </h2>

              <div class="grid grid-cols-4 gap-4">
                <TextInput
                  v-for="(data, index) in formData.meta"
                  :key="index"
                  :name="data.label"
                  :label="data.label"
                  :value.sync="formData.meta[index].value"
                />
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
import { Context } from '@nuxt/types'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import objectToFormData from '~/common/utils/objectToFormData'
import { Party, Person, Product } from '~/types/models'
import { MetaAuthOptions } from '~/types/entities'

@Component({
  async asyncData({ $repositories, $accessor, $auth }: Context) {
    const personId = ($auth.user?.person as Person).id

    await $accessor.people.fetchCurrent(personId)

    const metaData = await $repositories.project.create()

    return {
      formData: {
        title: '',
        description: '',
        purpose: '',
        parties: [],
        products: [],
        meta: metaData.data.attributes.map((meta: any) => {
          return { id: meta.id, label: meta.label, value: '' }
        }),
      },
    }
  },

  meta: {
    auth: {
      requiredPermissions: ['create projects'],
    } as MetaAuthOptions,
  },

  middleware: ['auth', 'check-permissions'],

  components: {
    ValidationObserver,
  },
})
export default class ProjectCreatePage extends mixins(NavigationRouterHook) {
  private formData: any

  private titleError: boolean = false

  get parties(): Party[] {
    return this.$accessor.people.current.parties || []
  }

  get relatedProducts(): Product[] {
    return this.$accessor.people.current.products || []
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  projectPictureSelected(event: any): void {
    this.formData.project_picture = event.target.files[0]
  }

  create(): void {
    this.$accessor.projects.store({ data: this.asFormData() }).then(() => {
      this.$router.push('/project/' + this.$accessor.projects.current.id)
    })
  }
}
</script>
