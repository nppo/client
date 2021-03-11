<template>
  <div>
    <vSelect
      v-model="localThemes"
      :options="allThemes"
      multiple
      append-to-body
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import vSelect from 'vue-select'
import { Theme } from '~/types/entities'

import 'vue-select/dist/vue-select.css'

@Component({
  async fetch(this: ThemeSelect) {
    await this.$accessor.themes.fetchAll()
  },
  components: {
    vSelect,
  },
})
export default class ThemeSelect extends Vue {
  @Prop({ type: Array }) themes!: Array<any>

  localThemes = this.themes

  @Watch('localThemes')
  updateThemes() {
    this.$emit('update:themes', this.localThemes)
  }

  get allThemes(): Theme[] {
    return this.$accessor.themes.all
  }
}
</script>
