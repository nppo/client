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

<style>
.vs__dropdown-toggle {
  @apply px-3 py-3 font-bold rounded-md shadow border-none !important;
}

.vs__dropdown-menu {
  @apply max-h-40 overflow-y-auto rounded-md shadow border-none mt-3 p-4 !important;
}

.vs__dropdown-option {
  @apply text-blue-800 block py-2 mb-2 text-sm border-b border-gray-100 !important;
}

.vs__dropdown-option--highlight {
  @apply font-bold border-b-2 border-yellow-brand bg-transparent text-blue-800 !important;
}

.vs__selected {
  @apply px-3 py-1 m-1 text-xs font-extrabold bg-green-300 rounded-md cursor-pointer border-none flex-row-reverse !important;
}

.vs__deselect {
  @apply mr-1 ml-0 fill-current !important;
}
</style>
