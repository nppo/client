<template>
  <div class="w-full cursor-pointer">
    <CoolLightBox
      :src="data.image.url"
      :index="index"
      :items="[data.image.url]"
      @close="index = null"
    />
    <!-- @TODO SURAPP-302: Make sure the image below is styled nicely -->
    <div class="w-full h-104" @click="index = 0">
      <img :src="data.image.url" class="block object-contain rounded-md" />
    </div>
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
export default class ImageContent extends Vue {
  private index: null | number = null

  @Prop({ type: Object, required: true }) data!: object
}
</script>
