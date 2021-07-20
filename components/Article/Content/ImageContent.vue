<template>
  <div class="w-full cursor-pointer">
    <CoolLightBox
      :src="data.image.url"
      :index="index"
      :items="[data.image.url]"
      @close="index = null"
    />
    <div class="relative w-full h-104" @click="index = 0">
      <img :src="data.image.url" class="block object-cover w-full rounded-md h-104" />

      <span class="absolute top-0 right-0 p-3 text-white">
        <font-awesome-icon class="text-xl fill-current" icon="expand" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ImageComponent } from '~/types/entities'

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: {
    CoolLightBox,
  },
})
export default class ImageContent extends Vue {
  private index: null | number = null

  @Prop({ type: Object, required: true }) data!: ImageComponent
}
</script>
