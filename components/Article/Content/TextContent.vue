<template>
  <div class="w-full | markdown">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="$md.render(data.text)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { TextComponent } from '~/types/entities'

@Component
export default class TextContent extends Vue {
  @Prop({ type: Object, required: true }) data!: TextComponent
}
</script>
