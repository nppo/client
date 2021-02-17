<template>
  <div
    class="flex items-center w-full px-2 py-1 font-bold bg-green-300 rounded-md"
  >
    <font-awesome-icon
      v-if="iconStyle && iconName"
      :icon="[iconStyle, iconName]"
      class="mr-2 text-xs"
    />

    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Badge extends Vue {
  @Prop({ type: String }) iconName!: string
  @Prop({ type: String }) iconStyle!: string
  @Prop({ type: Object }) entity!: object
  @Prop({ type: String }) text!: string
}
</script>
