<template>
  <div class="w-full cursor-pointer">
    <CoolLightBox
      :src="data.image.url"
      :index="index"
      :items="[data.image.url]"
      @close="index = null"
    />
    <div class="w-full h-104" @click="index = 0">
      <img :src="data.image.url" class="block object-cover w-full rounded-md h-104" />
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
