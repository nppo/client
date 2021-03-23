<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <div class="flex items-center justify-between">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
      </div>

      <div class="mt-18">
        <h1 class="mb-6 text-4xl font-bold">
          {{ $t('pages.product.create.headings.create') }}
        </h1>

        <ValidationObserver>
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="create"
          >
            <div class="flex justify-between mb-6 space-x-32">
              <div class="w-6/12">
                <SelectInput
                  :value.sync="formData.type"
                  :name="$t('pages.product.create.form.labels.type')"
                  :label="$t('pages.product.create.form.labels.type')"
                  :options="types"
                  :on-selected="(option) => option.label"
                />

                <TextInput
                  :value.sync="formData.title"
                  :name="$t('pages.product.create.form.labels.title')"
                  :label="$t('pages.product.create.form.labels.title')"
                  :error-message="$t('validation.required')"
                  :has-errors.sync="titleError"
                />

                <div class="flex flex-col mb-4">
                  <label
                    class="pl-3 mb-1"
                    :for="$t('pages.product.create.form.labels.description')"
                  >
                    {{ $t('pages.product.create.form.labels.description') }}
                  </label>
                  <textarea
                    :id="$t('pages.product.create.form.labels.description')"
                    v-model="formData.description"
                    rows="6"
                    class="p-3 font-bold rounded-md shadow focus:outline-none"
                  />
                </div>
              </div>

              <div class="w-6/12">
                <div class="flex flex-col mb-4">
                  <ToggleInput
                    :value.sync="external"
                    :name="$t('pages.product.create.form.labels.external')"
                    :label="$t('pages.product.create.form.labels.external')"
                  />
                  <TextInput
                    v-if="external"
                    :value.sync="formData.link"
                    :name="$t('pages.product.create.form.labels.link')"
                    :label="$t('pages.product.create.form.labels.link')"
                  />
                  <FileInput
                    v-else
                    :value.sync="formData.file"
                    :name="$t('pages.product.create.form.labels.file')"
                    :label="$t('pages.product.create.form.labels.file')"
                  />
                  <Multiselect
                    :entity.sync="formData.tags"
                    :options="tags"
                    :label="$t('pages.product.create.form.labels.tags')"
                  />

                  <Multiselect
                    :entity.sync="formData.themes"
                    :options="themes"
                    :label="$t('pages.product.create.form.labels.themes')"
                  />

                  <Multiselect
                    :entity.sync="formData.people"
                    :options="people"
                    :label="$t('pages.product.create.form.labels.people')"
                    :option-label="
                      (option) => `${option.firstName} ${option.lastName}`
                    "
                  />
                  <Multiselect
                    :entity.sync="formData.parties"
                    :options="parties"
                    :label="$t('pages.product.create.form.labels.parties')"
                    :option-label="(option) => `${option.name}`"
                  />
                </div>
              </div>
            </div>

            <button
              class="self-start px-4 py-2 text-sm text-white rounded bg-orange-brand"
              type="submit"
            >
              {{ $t('general.actions.create') }}
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { Context } from '@nuxt/types'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Type } from '~/types/entities'
import { Party, Person, Tag, Theme } from '~/types/models'
import objectToFormData from '~/common/utils/objectToFormData'

@Component({
  components: {
    ValidationObserver,
  },
  async asyncData({ $accessor }: Context) {
    await Promise.all([
      $accessor.productTypes.fetchAll(),
      $accessor.tags.fetchAll(),
      $accessor.themes.fetchAll(),
      $accessor.people.fetchAll(),
      $accessor.people.fetchCurrent(
        $accessor.user.current.person?.id as number
      ),
    ])
  },
})
export default class ProjectCreatePage extends mixins(NavigationRouterHook) {
  private formData: any = {
    type: null,
    title: '',
    description: '',
    file: null,
    tags: [],
    themes: [],
    people: [],
    parties: [],
    link: null,
  }

  private external: boolean = false

  private titleError: boolean = false

  get types(): Type[] {
    return this.$accessor.productTypes.all
  }

  get tags(): Tag[] {
    return this.$accessor.tags.all
  }

  get themes(): Theme[] {
    return this.$accessor.themes.all
  }

  get people(): Person[] {
    return this.$accessor.people.all
  }

  get parties(): Party[] {
    return this.$accessor.people.current.parties || []
  }

  @Ref('form') readonly form!: HTMLFormElement

  create(): void {
    if (!this.titleError) {
      this.$accessor.products.store(this.asFormData()).then(() => {
        this.$router.push('/product/' + this.$accessor.products.current.id)
      })
    }
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }
}
</script>
