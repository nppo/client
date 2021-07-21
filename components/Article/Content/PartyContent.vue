<template>
  <div class="w-full cursor-pointer">
    <PartyBlock v-if="party" :party="party" :article-block="true" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Party } from '~/types/models'

@Component({
  async fetch(): Promise<void> {
    if (this.data?.identifier) {
      const { status, data } = await this.$repositories.party.show(
        this.data.identifier
      )
      if (status === 200) {
        this.party = data.data
      }
    }
  },
})
export default class PartyContent extends Vue {
  @Prop({ type: Object, required: true }) data!: object

  public party: Party | null = null
}
</script>
