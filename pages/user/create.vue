<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.users.create.heading') }}
          </h1>
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="handleSubmit(create)"
          >
            <div class="flex mb-6 space-x-32">
              <div class="w-6/12">
                <div class="flex space-x-8">
                  <div class="w-6/12">
                    <TextInput
                      :value.sync="formData.person.first_name"
                      :name="'First'"
                      :label="'First'"
                      :rules="[$rules.required]"
                    />
                  </div>

                  <div class="w-6/12">
                    <TextInput
                      :value.sync="formData.person.last_name"
                      :name="'last'"
                      :label="'last'"
                      :rules="[$rules.required]"
                    />
                  </div>
                </div>

                <TextInput
                  :value.sync="formData.email"
                  :name="$t('pages.product.create.form.labels.title')"
                  :label="$t('pages.product.create.form.labels.title')"
                  :rules="[$rules.required]"
                />
              </div>

              <div class="w-6/12">
                <div class="flex flex-col mb-4"></div>
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

@Component({
  components: {
    ValidationObserver,
  },

  async asyncData({ $accessor }: Context) {
    await Promise.all([
      $accessor.people.fetchCurrent(
        $accessor.user.current.person?.id as number
      ),
    ])

    return {
      formData: {
        email: '',
        person: {
          first_name: '',
          last_name: '',
        },
      },
    }
  },
})
export default class USerCreatePage extends mixins(NavigationRouterHook) {
  private formData: any

  create(): void {
    this.$accessor.user.store(this.asFormData()).then(() => {
      this.$router.push('/user/' + this.$accessor.user.current.id)
    })
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }
}
</script>
