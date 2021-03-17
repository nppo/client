<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.project.form.headings.edit', {
          name: project.title,
        })
      }}
    </h1>

    <ValidationObserver>
      <form
        ref="form"
        class="p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="update"
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

            <Multiselect
              :entity.sync="formData.parties"
              :options="parties"
              :label="$t('pages.project.form.labels.parties')"
              :error-message="$t('validation.required')"
              :has-errors.sync="partiesError"
              option-label-attribute="name"
            />

            <Multiselect
              :entity.sync="formData.products"
              :options="relatedProducts"
              :label="$t('pages.project.form.labels.products')"
              :error-message="$t('validation.required')"
              :has-errors.sync="productsError"
              option-label-attribute="title"
            />
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
          {{ $t('general.save') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Ref, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import objectToFormData from '~/common/utils/objectToFormData'
import { Party, Person, Product, Project } from '~/types/models'

@Component({
  async asyncData({ $accessor, $auth }: Context) {
    await $accessor.parties.fetchAll()
    await $accessor.user.fetchProducts(($auth.user?.person as Person).id)
  },

  middleware({ $auth, error, $gates, app: { i18n } }: Context) {
    if ($auth.loggedIn && $gates.hasPermission('update projects')) {
      return
    }

    return error({
      statusCode: 403,
      message: String(i18n.t('pages.error.403')),
    })
  },

  components: {
    ValidationObserver,
  },
})
export default class ProjectEditPage extends mixins(NavigationRouterHook) {
  private formData: any = {
    title: '',
    purpose: '',
    description: '',
    parties: [],
    products: [],
  }

  private titleError: boolean = false
  private partiesError: boolean = false
  private productsError: boolean = false

  @Ref('form') readonly form!: HTMLFormElement

  get project(): Project {
    return this.$accessor.projects.current
  }

  get parties(): Party[] {
    return this.$accessor.parties.all
  }

  get relatedProducts(): Product[] {
    return this.$accessor.user.products
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  update(): void {
    if (!this.titleError) {
      this.$accessor.projects
        .update({ id: this.project.id, data: this.asFormData() })
        .then(() => {
          this.resetForm()
          this.$router.push('/project/' + this.project.id)
        })
    }
  }

  beforeMount() {
    this.resetForm()
  }

  resetForm() {
    if (this.form) {
      this.form.reset()
    }

    this.formData.title = this.project.title
    this.formData.purpose = this.project.purpose
    this.formData.description = this.project.description
    this.formData.parties = this.project.parties
    this.formData.products = this.project.products
    delete this.formData.project_picture
  }

  projectPictureSelected(event: any): void {
    this.formData.project_picture = event.target.files[0]
  }

  created(): void {
    if (!this.$accessor.projects.current.can?.update) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }
  }
}
</script>
