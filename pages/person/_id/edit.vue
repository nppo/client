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
          Opslaan
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Person } from '~/types/entities'

@Component({
  async fetch(this: PersonDetailEditPage) {
    await this.setPerson(this.person)
  },
})
export default class PersonDetailEditPage extends Vue {
  private personData: Person = {} as Person

  @Prop({ type: Object, required: true }) person!: Person

  setPerson(person: Person) {
    this.personData = { ...person }
  }

  updatePerson(): void {
    this.$accessor.people.updatePerson(this.personData)
  }
}
</script>
