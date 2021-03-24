<template>
  <div>
    <font-awesome-icon
      v-if="active"
      class="w-3 h-3 fill-current"
      icon="arrow-up"
    />
    <font-awesome-icon v-else class="w-3 h-3 fill-current" icon="arrow-down" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DropdownArrows extends Vue {
  @Prop({ type: Boolean, default: false }) readonly active!: boolean
}
</script>
