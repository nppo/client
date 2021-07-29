<template>
  <LocaleLink
    :path="`/${page}/${entityId}/edit`"
    class="flex justify-center p-2 text-white bg-red-500 rounded-full cursor-pointer"
    :class="`w-${circleSize} h-${circleSize}`"
  >
    <font-awesome-icon :class="`text-${iconSize}`" icon="times" />
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DeleteButton extends Vue {
  @Prop({ type: String, required: true }) readonly page!: string
  @Prop({ type: Number, required: true }) readonly entityId!: number
  @Prop({ type: String, default: '8' }) circleSize!: string
  @Prop({ type: String, default: 'base' }) iconSize!: string
}
</script>
