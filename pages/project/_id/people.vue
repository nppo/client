<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h2 class="mb-2 text-3xl">
        {{ $t('types.person') }}
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="person in projectContent" :key="person.id">
        <PersonBlock :person="person" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Person } from '~/types/entities'

@Component
export default class ProjectPeoplePage extends Vue {
  @Prop({ type: Array, required: true }) projectContent!: Person
}
</script>
