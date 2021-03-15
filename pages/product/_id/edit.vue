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
        class="p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="updateProduct"
      >
        <div class="flex justify-between mb-6 space-x-32">
          <div class="w-6/12">
            <TextInput
              :value.sync="productData.title"
              :name="$t('pages.product._id.edit.labels.title')"
              :label="$t('pages.product._id.edit.labels.title')"
              :error-message="$t('validation.required')"
              :has-errors.sync="titleError"
            />

            <div class="flex flex-col mb-4">
              <label
                class="pl-3 mb-1"
                :for="$t('pages.product._id.edit.labels.description')"
              >
                {{ $t('pages.product._id.edit.labels.description') }}
              </label>
              <textarea
                :id="$t('pages.product._id.edit.labels.description')"
                v-model="productData.description"
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
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Product } from '~/types/models'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class ProductEditPage extends mixins(NavigationRouterHook) {
  private productData: Product = { ...this.product }
  private titleError: boolean = false

  get product(): Product {
    return this.$accessor.products.current
  }

  updateProduct(): void {
    if (!this.titleError) {
      this.$accessor.products.update(this.productData).then(() => {
        this.$router.push('/product/' + this.product.id)
      })
    }
  }

  mounted(): void {
    if (this.$gates.unlessPermission('update products')) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }

    if (!this.product.can?.update) {
      return this.$nuxt.error({
        statusCode: 403,
        message: String(this.$i18n.t('pages.error.403')),
      })
    }
  }
}
</script>
