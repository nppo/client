<template>
  <div>
    <div v-if="projectContent.length > 0">
      <div class="flex items-center justify-between mb-5">
        <h2 class="mb-2 text-3xl">
          {{ $t('pages.project._id.types.parties') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="party in projectContent" :key="party.id">
          <PartyBlock :party="party" />
        </div>
      </div>
    </div>

    <div v-else>
      {{
        $t('pages.project._id.no_result', {
          entity: $t('entities.party.plural'),
        })
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Party } from '~/types/entities'

@Component
export default class ProjectPartyPage extends Vue {
  @Prop({ type: Array, required: true }) projectContent!: Party[]
}
</script>
