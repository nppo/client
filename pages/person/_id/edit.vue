<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.person._id.edit.title', {
          name: person.firstName + ' ' + person.lastName,
        })
      }}
    </h1>

    <ValidationObserver>
      <form
        ref="form"
        class="flex flex-col p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="updatePerson"
      >
        <div class="flex justify-between mb-6 space-x-32">
          <div class="flex flex-col mb-4">
            <label
              :for="$t('pages.person._id.edit.labels.profile_picture')"
              class="pl-3 mb-1"
            >
              {{ $t('pages.person._id.edit.labels.profile_picture') }}
            </label>

            <input
              :id="$t('pages.person._id.edit.labels.profile_picture')"
              class="px-3 py-3 font-bold rounded-md shadow focus:outline-none"
              type="file"
              @change="profilePictureSelected"
            />
          </div>
        </div>

        <div class="flex justify-between mb-6 space-x-32">
          <div class="w-4/12">
            <TextInput
              :value.sync="formData.first_name"
              :name="$t('pages.person._id.edit.labels.first_name')"
              :label="$t('pages.person._id.edit.labels.first_name')"
              :error-message="$t('validation.required')"
              :has-errors.sync="firstNameError"
            />

            <TextInput
              :value.sync="formData.last_name"
              :name="$t('pages.person._id.edit.labels.last_name')"
              :label="$t('pages.person._id.edit.labels.last_name')"
              :error-message="$t('validation.required')"
              :has-errors.sync="lastNameError"
            />

            <Multiselect
              :entity.sync="formData.skills"
              :options="skills"
              :label="$t('pages.person._id.edit.labels.skills')"
            />

            <Multiselect
              :entity.sync="formData.themes"
              :options="themes"
              :label="$t('pages.person._id.edit.labels.themes')"
              :required="true"
              :error-message="$t('validation.required')"
              :has-errors.sync="themesError"
            />
          </div>
          <div class="w-8/12">
            <div>
              <div class="flex flex-col">
                <label
                  :for="$t('pages.person._id.edit.labels.about')"
                  class="pl-3 mb-1"
                >
                  {{ $t('pages.person._id.edit.labels.about') }}
                </label>

                <textarea
                  :id="$t('pages.person._id.edit.labels.about')"
                  v-model="formData.about"
                  rows="6"
                  class="w-full px-3 py-3 font-bold rounded-md shadow focus:outline-none"
                />
              </div>
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
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Person, Tag, Theme } from '~/types/models'
import objectToFormData from '~/common/utils/objectToFormData'

@Component({
  async fetch(this: PersonEditPage) {
    await this.$accessor.skills.fetchAll()
    await this.$accessor.themes.fetchAll()
  },
  components: {
    ValidationObserver,
  },
})
export default class PersonEditPage extends mixins(NavigationRouterHook) {
  private formData: any = {
    first_name: null,
    last_name: null,
    about: null,
    skills: [],
    themes: [],
  }

  private firstNameError: boolean = false
  private lastNameError: boolean = false
  private themesError: boolean = false

  @Ref('form') readonly form!: HTMLFormElement

  get person(): Person {
    return this.$accessor.people.current
  }

  get skills(): Tag[] {
    return this.$accessor.skills.all
  }

  get themes(): Theme[] {
    return this.$accessor.themes.all
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  updatePerson(): void {
    if (!this.firstNameError && !this.lastNameError && !this.themesError) {
      this.$accessor.people
        .update({ id: this.person.id, data: this.asFormData() })
        .then(() => {
          this.resetForm()
          this.$router.push('/person/' + this.person.id)
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

    this.formData.first_name = this.person.firstName
    this.formData.last_name = this.person.lastName
    this.formData.about = this.person.about
    this.formData.skills = this.person.skills
    this.formData.themes = this.person.themes
    delete this.formData.profile_picture
  }

  profilePictureSelected(event: any): void {
    this.formData.profile_picture = event.target.files[0]
  }

  mounted() {
    if (this.$gates.unlessPermission('update people')) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }

    if (!this.person.can?.update) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }
  }
}
</script>
