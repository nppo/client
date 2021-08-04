<template>
  <button
    type="button"
    class="flex justify-center p-2 text-blue-800 rounded-full cursor-pointer bg-yellow-brand"
    :class="`w-${circleSize} h-${circleSize}`"
    @click="$emit('delete-entity')"
  >
    <font-awesome-icon :class="`text-${iconSize}`" icon="trash-alt" />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DeleteButton extends Vue {
  @Prop({ type: String, required: true }) readonly page!: string
  @Prop({ type: String, required: true }) readonly entityId!: string
  @Prop({ type: String, default: '8' }) circleSize!: string
  @Prop({ type: String, default: 'base' }) iconSize!: string
}
</script>
