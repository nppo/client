<template>
  <div class="w-full">
    <CoolLightBox
      :src="data.image.url"
      :index="index"
      :items="[data.image.url]"
      @close="index = null"
    />
    <div class="relative w-full h-104" @click="index = 0">
      <img
        :src="data.image.url"
        class="block object-cover w-full rounded-md cursor-pointer h-104"
      />

      <span class="absolute top-0 right-0 p-3 text-white">
        <font-awesome-icon class="text-xl fill-current" icon="expand" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import { ImageComponent } from '~/types/entities'

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
