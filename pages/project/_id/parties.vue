<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h2 class="mb-2 text-3xl">
        {{ $t('pages.project_show.types.parties') }}
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="party in projectContent" :key="party.id">
        <PartyBlock :party="party" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Party } from '~/types/entities'

@Component
export default class ProjectPartyPage extends Vue {
  @Prop({ type: Array, required: true }) projectContent!: Party
}
</script>
