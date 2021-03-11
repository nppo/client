<template>
  <div>
    <div v-for="person in slicedListItems" :key="person.id" class="mb-4">
      <div class="flex items-center justify-between">
        <LocaleLink
          class="flex items-center w-full"
          :path="`/person/${person.id}`"
        >
          <!-- TODO: When image available make image dynamic: v-if="person.image" -->
          <img
            v-if="person.profile_picture_url"
            class="inline w-10 h-10 mr-4 rounded-full"
            :src="person.profile_picture_url"
            :alt="person.firstName + '_avatar'"
          />

          <div class="flex flex-col mr-2 break-all">
            <span class="font-bold">
              {{ person.firstName }} {{ person.lastName }}
            </span>

            <span v-if="person.function" class="text-gray-300">
              {{ person.function }}
            </span>
          </div>
        </LocaleLink>

        <FollowButton />
      </div>
    </div>

    <div class="mb-6">
      <div v-if="people.length > maxFilters" class="block mt-3 text-center">
        <span
          class="text-blue-400 underline cursor-pointer"
          @click="showingAll = !showingAll"
        >
          {{
            showingAll
              ? $t('general.show_less')
              : $t('general.show_more', { number: showMoreNumber })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Person } from '~/types/entities'

@Component
export default class PeopleList extends Vue {
  public showingAll: boolean = false

  @Prop({ type: Number, default: 3 }) maxFilters!: number
  @Prop({ type: Array, required: true }) people!: Person[]

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.people.length
    }

    return this.maxFilters
  }

  get showMoreNumber(): number {
    return this.people.length - this.maxFilters
  }

  get slicedListItems(): Person[] {
    return this.people.slice(0, this.numberVisibleListItems)
  }
}
</script>
