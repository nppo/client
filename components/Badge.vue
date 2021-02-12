<template>
  <div
    class="flex items-center px-2 py-1 w-full font-bold rounded-md bg-green-300"
  >
    <font-awesome-icon
      v-if="iconName && iconStyle"
      :icon="[iconName, iconStyle]"
      class="text-xs mr-2"
    />

    naam
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Badge extends Vue {
  @Prop({ type: String }) iconName!: string
  @Prop({ type: String }) iconStyle!: string
  @Prop({ type: Object }) entity!: object
}
</script>
