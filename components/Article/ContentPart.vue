<template>
  <component :is="viewerComponent" :data="data" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ContentSkeleton from '~/components/Article/Content/ContentSkeleton.vue'

@Component({
  components: {
    ContentSkeleton,
  },
})
export default class ContentCard extends Vue {
  @Prop({ type: Object, required: true }) data!: { __component: string }

  private viewerComponent: any = null

  mounted() {
    this.loadComponent
      .then(() => {
        this.viewerComponent = () => this.loadComponent
      })
      .catch(() => {
        this.viewerComponent = () =>
          import(`~/components/Article/Content/FallbackContent.vue`)
      })
  }

  get loadComponent(): any {
    const type = this.data.__component.split('.')[1].toUpperCase()
    const name = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()

    return import(`~/components/Article/Content/${name}Content.vue`)
  }
}
</script>
