<template>
  <div
    class="flex flex-col h-full bg-white rounded-md shadow-block overflow-hidden"
  >
    <div class="relative">
      <img
        v-if="product.image"
        class="w-full mb-2"
        :src="product.image"
        alt="Product picture"
      />

      <div class="flex justify-between items-center">
        <span
          class="m-4 mb-5 min-w-1/4"
          :class="{ 'absolute top-0 left-0': product.image }"
        >
          <Badge :entity="product" icon-name="link" icon-style="fas" />
        </span>
        <span v-if="!product.image" class="pr-4">
          {{ product.themes[0].label }}
        </span>
      </div>
    </div>

    <div class="flex justify-between px-4 text-tiny">
      <span>21 sep 2020</span>

      <span v-if="product.image">{{ product.themes[0].label }}</span>
    </div>

    <div class="flex flex-col p-4">
      <h4 class="text-base mb-1">{{ product.title }}</h4>

      <div class="text-gray-300" :class="{ 'line-clamp-4': product.image }">
        {{ product.description }}
      </div>
    </div>

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <span class="text-blue-500">
        <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ProductBlock extends Vue {
  @Prop({ type: Object, required: true }) product!: object
}
</script>
