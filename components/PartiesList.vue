<template>
  <div>
    <div v-for="party in slicedListItems" :key="party.id" class="mb-4">
      <LocaleLink :path="`/party/${party.id}`">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- TODO: When image available make image dynamic: v-if="party.image" -->
            <img
              v-if="party.partyPictureUrl"
              class="inline w-10 h-10 mr-4 rounded-full"
              :src="party.partyPictureUrl"
              :alt="party.name + '_logo'"
            />

            <div class="flex flex-col mr-2 break-all">
              <span class="font-bold">
                {{ party.name }}
              </span>

              <span class="text-gray-300">Functie</span>
            </div>
          </div>

          <font-awesome-icon class="block text-base" icon="arrow-right" />
        </div>
      </LocaleLink>
    </div>

    <div class="mb-6">
      <div v-if="parties.length > maxEntities" class="block mt-3 text-center">
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
import { Party } from '~/types/models'

@Component
export default class PartiesList extends Vue {
  public showingAll: boolean = false

  @Prop({ type: Number, default: 3 }) maxEntities!: number
  @Prop({ type: Array, required: true }) parties!: Party[]

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.parties.length
    }

    return this.maxEntities
  }

  get showMoreNumber(): number {
    return this.parties.length - this.maxEntities
  }

  get slicedListItems(): Party[] {
    return this.parties.slice(0, this.numberVisibleListItems)
  }
}
</script>
