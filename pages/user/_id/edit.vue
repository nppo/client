<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{
              $t('pages.management.users.edit.heading', {
                name: 'Tom' + ' ' + 'Stemerding',
              })
            }}
          </h1>
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="p-4 overflow-hidden bg-white rounded-md shadow"
            @submit.prevent="handleSubmit(update)"
          >
            <div class="flex mb-6 space-x-32">
              <div class="w-6/12">
                <div class="flex space-x-8">
                  <div class="w-6/12">
                    <TextInput
                      :value.sync="formData.person.firstName"
                      :name="'First'"
                      :label="'First'"
                      :rules="[$rules.required]"
                    />
                  </div>

                  <div class="w-6/12">
                    <TextInput
                      :value.sync="formData.person.lastName"
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
import { Component, Ref, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { Context } from '@nuxt/types'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import objectToFormData from '~/common/utils/objectToFormData'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  components: {
    ValidationObserver,
  },

  // async asyncData({ $accessor }: Context) {
  //   await Promise.all([
  //     $accessor.people.fetchCurrent(
  //       $accessor.user.current.person?.id as number
  //     ),
  //   ])
  // },
})
export default class UserEditPage extends mixins(NavigationRouterHook) {
  private formData: {
    email: 'Tom@way2web.nl'
    person: {
      firstName: 'Tom'
      lastName: 'Stemerding'
    }
  }

  @Ref('form') readonly form!: HTMLFormElement

  update(): void {
    this.$accessor.user.update({ id: 1, data: this.asFormData() }).then(() => {
      this.$router.push('/management/users')

      Swal.fire(
        String(this.$t('general.actions.confirm.edit.success_title')),
        String(
          this.$t('general.actions.confirm.edit.success_text', {
            entity: formData.person
              ? formData.person.firstName + formData.person.lastName
              : '',
          })
        ),
        'success'
      )
    })
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  beforeMount() {
    this.resetForm()
  }

  resetForm() {
    if (this.form) {
      this.form.reset()
    }

    // this.formData.person.firstName = 'Tom'
    // this.formData.person.lastName = 'Stemerding'
    // this.formData.email = 'tom@way2web.nl'
  }
}
</script>
