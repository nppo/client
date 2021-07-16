<template>
  <div class="w-full">
    <!-- @TODO SURAPP-301: Render the text (which is markdown) -->
    {{ data.text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: {
    CoolLightBox,
  },
})
export default class TextContent extends Vue {
  private index: null | number = null

  @Prop({ type: Object, required: true }) data!: object
}
</script>
