<template>
  <component
    :is="tag || 'div'"
    v-bind="{ ...$attrs }"
    class="flex items-center px-2 py-1 font-bold rounded-md"
    :class="`bg-${color} text-${textColor}`"
    v-on="{ ...$attrs.on }"
  >
    <font-awesome-icon
      v-if="iconStyle && iconName"
      :icon="[iconStyle, iconName]"
      class="mr-2 text-xs"
    />

    {{ text }}
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Badge extends Vue {
  @Prop({ type: String }) iconName!: string
  @Prop({ type: String }) iconStyle!: string
  @Prop({ type: String }) text!: string
  @Prop({ type: String }) tag!: string
  @Prop({ type: String, default: 'green-300' }) color!: string
  @Prop({ type: String, default: 'blue-800' }) textColor!: string
}
</script>
