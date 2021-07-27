<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.product._id.edit.title', {
          name: product.title,
        })
      }}
    </h1>

    <ValidationObserver>
      <form
        ref="form"
        class="p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="update"
      >
        <div class="flex mb-6 space-x-32">
          <div class="w-6/12">
            <div class="flex space-x-8">
              <div class="w-6/12">
                <DatePicker
                  :value.sync="formData.publishedAt"
                  :name="$t('pages.product.create.form.labels.published_at')"
                  :label="$t('pages.product.create.form.labels.published_at')"
                />
              </div>
            </div>

            <TextInput
              :value.sync="formData.title"
              :name="$t('pages.product._id.edit.labels.title')"
              :label="$t('pages.product._id.edit.labels.title')"
              :required="true"
              :error-message="$t('validation.required')"
              :has-errors.sync="titleError"
            />

            <Textarea
              :value.sync="formData.summary"
              :name="$t('pages.product.create.form.labels.summary')"
              :label="$t('pages.product.create.form.labels.summary')"
            />

            <Textarea
              :value.sync="formData.description"
              :name="$t('pages.product.create.form.labels.description')"
              :label="$t('pages.product.create.form.labels.description')"
            />
          </div>

          <div class="w-6/12">
            <div class="flex flex-col mb-4">
              <Multiselect
                :entity.sync="formData.tags"
                :options="tags"
                :taggable="true"
                :label="$t('pages.product._id.edit.labels.tags')"
              />

              <Multiselect
                :entity.sync="formData.themes"
                :options="themes"
                :label="$t('pages.product._id.edit.labels.themes')"
              />

              <Multiselect
                :entity.sync="formData.people"
                :options="people"
                :label="$t('pages.product._id.edit.labels.people')"
                :option-label="
                  (option) => `${option.firstName} ${option.lastName}`
                "
              />
              <Multiselect
                :entity.sync="formData.parties"
                :options="parties"
                :label="$t('pages.product._id.edit.labels.parties')"
                :option-label="(option) => `${option.name}`"
              />
              <Multiselect
                v-if="
                  product.type === 'collection' &&
                  product.parents &&
                  !product.parents.length
                "
                :entity.sync="formData.children"
                :options="products"
                :label="$t('pages.product._id.edit.labels.children')"
                option-label-attribute="title"
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
import { Component, Ref, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions, Type } from '~/types/entities'

import { Product, Party, Person, Tag, Theme } from '~/types/models'
import objectToFormData from '~/common/utils/objectToFormData'

@Component({
  meta: {
    auth: {
      requiredPermissions: ['update products'],
    } as MetaAuthOptions,
  },

  middleware: ['auth', 'check-permissions'],

  async asyncData({ $accessor }) {
    await $accessor.tags.fetchAll()
    await $accessor.themes.fetchAll()
    await $accessor.people.fetchAll()

    if ($accessor.user.current.person?.id) {
      await $accessor.people.fetchCurrent($accessor.user.current.person?.id)
    }
  },

  components: {
    ValidationObserver,
  },
})
export default class ProductEditPage extends mixins(NavigationRouterHook) {
  private formData: any = {
    type: null,
    title: '',
    summary: '',
    description: '',
    file: null,
    tags: [],
    themes: [],
    people: [],
    parties: [],
    children: [],
    publishedAt: '',
  }

  private titleError: boolean = false

  @Ref('form') readonly form!: HTMLFormElement

  get product(): Product {
    return this.$accessor.products.current
  }

  get types(): Type[] {
    const types: Type[] = this.$accessor.productTypes.all

    if (this.product.parents?.length) {
      return types.filter(({ label }) => label !== 'collection')
    }

    return types
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

  get products(): Product[] {
    return this.$accessor.people.current.products || []
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  update(): void {
    if (!this.titleError) {
      this.$accessor.products
        .update({ id: this.product.id, data: this.asFormData() })
        .then(() => {
          this.resetForm()
          this.$router.push('/product/' + this.product.id)
        })
    }
  }

  beforeMount(): void {
    this.resetForm()
  }

  resetForm(): void {
    if (this.form) {
      this.form.reset()
    }

    this.formData.title = this.product.title
    this.formData.summary = this.product.summary
    this.formData.description = this.product.description
    this.formData.type = this.product.type
    this.formData.tags = this.product.tags
    this.formData.themes = this.product.themes
    this.formData.people = this.product.people
    this.formData.parties = this.product.parties
    this.formData.children = this.product.children
    this.formData.publishedAt = this.product.publishedAt
    delete this.formData.file
  }

  created(): void {
    if (!this.product.can?.update) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }
  }
}
</script>
