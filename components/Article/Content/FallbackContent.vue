<template>
  <div class="w-full h-full cursor-pointer">
    <div class="flex items-center justify-center w-full h-full bg-gray-100">
      <div class="flex flex-col items-center justify-center text-center">
        <div
          class="flex items-center justify-center mb-5 bg-gray-200 rounded-full h-28 w-28"
        >
          <font-awesome-icon
            :icon="['fas', 'file']"
            class="text-3xl text-blue-500"
          />
        </div>
        <p class="text-md">
          {{ $t('pages.product._id.preview.fallback') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FallbackContent extends Vue {
  @Prop({ type: Object, required: true }) data!: object
}
</script>
