<template>
  <div>
    <vSelect v-model="localTags" :options="tags" multiple append-to-body />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import vSelect from 'vue-select'
import { Tag } from '~/types/entities'

import 'vue-select/dist/vue-select.css'

@Component({
  async fetch(this: TagSelect) {
    await this.$accessor.tags.fetchAll()
  },
  components: {
    vSelect,
  },
})
export default class TagSelect extends Vue {
  @Prop({ type: Array }) entity!: Array<any>

  localTags = this.entity

  @Watch('localTags')
  updateTags() {
    this.$emit('update:entity', this.localTags)
  }

  get tags(): Tag[] {
    return this.$accessor.tags.all
  }
}
</script>
