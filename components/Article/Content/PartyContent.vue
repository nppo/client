<template>
  <div class="w-full cursor-pointer">
    <PartyBlock v-if="party" :party="party" :article-block="true" />
    <ContentSkeleton v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Party } from '~/types/models'
import ContentSkeleton from '~/components/Article/Content/ContentSkeleton.vue'
import { PartyComponent } from '~/types/entities'

@Component({
  components: { ContentSkeleton },
})
export default class PartyContent extends Vue {
  @Prop({ type: Object, required: true }) data!: PartyComponent

  public party: Party | null = null

  async fetch(): Promise<void> {
    if (this.data?.identifier) {
      const { status, data } = await this.$repositories.party.show(
        this.data.identifier
      )
      if (status === 200) {
        this.party = data.data
      }
    }
  }
}
</script>
