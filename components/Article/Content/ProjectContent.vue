<template>
  <div class="w-full cursor-pointer">
    <ProjectBlock v-if="project" :project="project" :article-block="true" />
    <ContentSkeleton v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Project } from '~/types/models'
import ContentSkeleton from '~/components/Article/Content/ContentSkeleton.vue'

@Component({
  components: { ContentSkeleton },
})
export default class ProjectContent extends Vue {
  @Prop({ type: Object, required: true }) data!: object

  public project: Project | null = null

  async fetch(): Promise<void> {
    if (this.data?.identifier) {
      const { status, data } = await this.$repositories.project.show(
        this.data.identifier
      )
      if (status === 200) {
        this.project = data.data
      }
    }
  }
}
</script>
