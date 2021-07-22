<template>
  <div>
    <img
      v-if="product.links && product.links.preview && product.type === 'image'"
      class="object-cover w-full h-32 mb-2"
      :src="product.links.preview"
      :alt="product.title + '_image'"
    />

    <iframe
      v-if="product.type === 'youtube'"
      class="w-full h-32 mb-2"
      :src="product.links && product.links.preview"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>

    <div
      v-if="product.type === 'collection'"
      class="w-full h-32 mb-2 bg-blue-800"
    />

    <div
      v-if="product.type === 'document' || product.type === 'empty'"
      class="flex items-center justify-center w-full h-32 mb-2 bg-blue-800"
    >
      <font-awesome-icon
        :icon="['fas', 'file']"
        class="text-3xl text-blue-500"
      />
    </div>

    <LinkPrevue
      v-if="product.type === 'link'"
      :url="product.links.preview"
      card-width="100%"
      :show-button="false"
    >
      <template slot-scope="props">
        <div v-if="props.img">
          <img
            class="object-cover w-full h-32 mb-2"
            :src="props.img"
            :alt="props.title"
          />
        </div>
        <div
          v-else
          class="flex items-center justify-center w-full h-32 mb-2 bg-blue-800"
        />
      </template>
    </LinkPrevue>
  </div>
</template>

<script lang="ts">
import LinkPrevue from 'link-prevue'

import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Product } from '~/types/models'

@Component({
  components: {
    LinkPrevue,
  },
})
export default class ProductBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly product!: Product
}
</script>
