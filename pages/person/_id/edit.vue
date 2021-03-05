<template>
  <div class="mt-18">
    <h1 class="pb-6 text-4xl font-bold">
      Edit {{ person.firstName }} {{ person.lastName }}
    </h1>

    <div class="h-full p-4 overflow-hidden bg-white rounded-md shadow">
      <form class="flex flex-col" @submit.prevent="updatePerson">
        <div class="flex flex-col mb-4">
          <label :for="personData.firstName"> Voornaam </label>
          <input
            :id="personData.firstName"
            v-model="personData.firstName"
            class="w-6/12 px-3 py-3 font-bold rounded-md shadow focus:outline-none"
            type="text"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label :for="personData.lastName"> Achternaam </label>
          <input
            :id="personData.lastName"
            v-model="personData.lastName"
            class="w-6/12 px-3 py-3 font-bold rounded-md shadow focus:outline-none"
            type="text"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label for="about">
            {{ $t('pages.person._id.about.title') }}
          </label>
          <textarea
            id="about"
            v-model="personData.about"
            class="w-6/12 px-3 py-3 font-bold rounded-md shadow focus:outline-none"
          />
        </div>

        <button
          class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
          type="submit"
        >
          {{ $t('general.save') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Person } from '~/types/entities'

@Component
export default class PersonDetailEditPage extends mixins(NavigationRouterHook) {
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
