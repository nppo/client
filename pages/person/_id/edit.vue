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
        class="flex flex-col p-4 overflow-hidden bg-white rounded-md shadow"
        @submit.prevent="updatePerson"
      >
        <div class="flex justify-between mb-6 space-x-32">
          <div class="w-4/12">
            <div>
              <TextInput
                :value.sync="personData.firstName"
                :name="$t('pages.person._id.edit.labels.first_name')"
                :label="$t('pages.person._id.edit.labels.first_name')"
                :error-message="$t('validation.required')"
              />

              <TextInput
                :value.sync="personData.lastName"
                :name="$t('pages.person._id.edit.labels.last_name')"
                :label="$t('pages.person._id.edit.labels.last_name')"
                :error-message="$t('validation.required')"
              />
            </div>
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
                  v-model="personData.about"
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
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Person } from '~/types/entities'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class PersonEditPage extends mixins(NavigationRouterHook) {
  private personData: Person = { ...this.person }
  private hasErrors: boolean = false

  get person(): Person {
    return this.$accessor.people.current
  }

  updatePerson(): void {
    this.$accessor.people.update(this.personData).then(() => {
      this.$router.push('/person/' + this.person.id)
    })
  }
}
</script>
