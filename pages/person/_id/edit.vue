<template>
  <div class="mt-18">
    <h1 class="mb-6 text-4xl font-bold">
      {{
        $t('pages.person._id.edit.title', {
          name: person.firstName + ' ' + person.lastName,
        })
      }}
    </h1>

    <form
      class="flex flex-col p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="updatePerson"
    >
      <div class="flex justify-between mb-6 space-x-32">
        <div class="w-4/12">
          <div>
            <div class="flex flex-col mb-4">
              <label
                :for="$t('pages.person._id.edit.labels.first_name')"
                class="pl-3 mb-1"
              >
                {{ $t('pages.person._id.edit.labels.first_name') }}
              </label>
              <input
                :id="$t('pages.person._id.edit.labels.first_name')"
                v-model="personData.firstName"
                class="px-3 py-3 font-bold rounded-md shadow focus:outline-none"
                type="text"
              />
            </div>

            <div class="flex flex-col">
              <label
                :for="$t('pages.person._id.edit.labels.last_name')"
                class="pl-3 mb-1"
              >
                {{ $t('pages.person._id.edit.labels.last_name') }}
              </label>
              <input
                :id="$t('pages.person._id.edit.labels.last_name')"
                v-model="personData.lastName"
                class="px-3 py-3 font-bold rounded-md shadow focus:outline-none"
                type="text"
              />
            </div>
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
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Person } from '~/types/entities'

@Component
export default class PersonEditPage extends mixins(NavigationRouterHook) {
  private personData: Person = { ...this.person }

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
