<template>
  <LocaleLink
    :path="`/${page}/${entityId}/edit`"
    class="flex justify-center p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
    :class="`w-${circleSize} h-${circleSize}`"
  >
    <font-awesome-icon :class="`text-${iconSize}`" icon="pencil-alt" />
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class EditButton extends Vue {
  @Prop({ type: String, required: true }) readonly page!: string
  @Prop({ type: [Number, String], required: true })
  readonly entityId!: number | string

  @Prop({ type: String, default: '8' }) circleSize!: string
  @Prop({ type: String, default: 'base' }) iconSize!: string
}
</script>
