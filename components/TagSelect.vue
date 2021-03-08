<template>
  <div>
    <vSelect v-model="entity" :options="tags" multiple taggable></vSelect>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
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
  @Prop({ type: Array, required: true }) entity!: Array<any>

  get tags(): Tag[] {
    return this.$accessor.tags.all
  }
}
</script>
