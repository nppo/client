<template>
  <div class="w-full cursor-pointer">
    <PersonBlock v-if="person" :person="person" :article-block="true" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Person } from '~/types/models'

@Component
export default class PersonContent extends Vue {
  @Prop({ type: Object, required: true }) data!: object

  public person: Person | null = null

  async fetch(): Promise<void> {
    if (this.data?.identifier) {
      const { status, data } = await this.$repositories.person.show(
        this.data.identifier
      )
      if (status === 200) {
        this.person = data.data
      }
    }
  }
}
</script>
