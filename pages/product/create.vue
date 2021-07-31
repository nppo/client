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

        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="handleSubmit(create)"
          >
            <div class="flex mb-6 space-x-32">
              <div class="w-6/12">
                <div class="flex space-x-8">
                  <div class="w-6/12">
                    <SelectInput
                      :value.sync="formData.type"
                      :name="$t('pages.product.create.form.labels.type')"
                      :label="$t('pages.product.create.form.labels.type')"
                      :options="types"
                      :required="true"
                      :error-message="$t('validation.required')"
                      :on-selected="(option) => option.label"
                    />
                  </div>

                  <div class="w-6/12">
                    <DatePicker
                      :value.sync="formData.publishedAt"
                      :name="
                        $t('pages.product.create.form.labels.published_at')
                      "
                      :label="
                        $t('pages.product.create.form.labels.published_at')
                      "
                    />
                  </div>
                </div>

                <TextInput
                  :value.sync="formData.title"
                  :name="$t('pages.product.create.form.labels.title')"
                  :label="$t('pages.product.create.form.labels.title')"
                  :rules="[$rules.required]"
                />

                <TextArea
                  :value.sync="formData.summary"
                  :name="$t('pages.product.create.form.labels.summary')"
                  :label="$t('pages.product.create.form.labels.summary')"
                />

                <TextArea
                  :value.sync="formData.description"
                  :name="$t('pages.product.create.form.labels.description')"
                  :label="$t('pages.product.create.form.labels.description')"
                  :rules="[$rules.required]"
                />
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
                    :rules="[$rules.required]"
                  />

                  <FileInput
                    v-else
                    :value.sync="formData.file"
                    :name="$t('pages.product.create.form.labels.file')"
                    :label="$t('pages.product.create.form.labels.file')"
                    :required="true"
                    :error-message="$t('validation.required')"
                  />

                  <Multiselect
                    :entity.sync="formData.tags"
                    :options="tags"
                    :label="$t('pages.product.create.form.labels.tags')"
                    :taggable="true"
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
                  <Multiselect
                    v-if="formData.type === 'collection'"
                    :entity.sync="formData.children"
                    :options="products"
                    :label="$t('pages.product.create.form.labels.children')"
                    option-label-attribute="title"
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
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { Context } from '@nuxt/types'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import objectToFormData from '~/common/utils/objectToFormData'
import { Type } from '~/types/entities'
import { Party, Person, Product, Tag, Theme } from '~/types/models'

@Component({
  components: {
    ValidationObserver,
  },
  async asyncData({ $accessor }: Context) {
    await $accessor.productTypes.fetchAll()
    await $accessor.tags.index({ perPage: 100 })
    await $accessor.themes.index({ perPage: 100 })
    await $accessor.people.fetchAll()

    if ($accessor.user.current.person?.id) {
      await $accessor.people.fetchCurrent($accessor.user.current.person?.id)
    }

    return {
      formData: {
        type: null,
        title: '',
        summary: '',
        description: '',
        tags: [],
        themes: [],
        people: [],
        parties: [],
        publishedAt: '',
        file: null,
        link: null,
        children: [],
      },
    }
  },
})
export default class ProjectCreatePage extends mixins(NavigationRouterHook) {
  private formData: any

  private external: boolean = false

  get types(): Type[] {
    return this.$accessor.productTypes.all
  }

  get tags(): Tag[] {
    return this.$accessor.tags.all
  }

  get themes(): Theme[] {
    return this.$accessor.themes.all.items
  }

  get people(): Person[] {
    return this.$accessor.people.all
  }

  get parties(): Party[] {
    return this.$accessor.people.current.parties || []
  }

  get products(): Product[] {
    return this.$accessor.people.current.products || []
  }

  create(): void {
    this.$accessor.products.store(this.asFormData()).then(() => {
      this.$router.push('/product/' + this.$accessor.products.current.id)
    })
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }
}
</script>
