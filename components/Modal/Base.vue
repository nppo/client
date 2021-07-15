<template>
  <div>
    <slot name="trigger" />

    <transition
      enter-active-class="duration-300 ease-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-20 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 transition-opacity bg-gray-500 opacity-75"
            @click="close()"
          ></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <transition
            enter-active-class="duration-300 ease-out"
            enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enter-to-class="translate-y-0 opacity-100 sm:scale-100"
            leave-active-class="duration-200 ease-in"
            leave-class="translate-y-0 opacity-100 sm:scale-100"
            leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block w-full h-auto overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-2xl sm:my-8"
              :class="width"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="absolute top-0 right-0 block p-8">
                <button type="button" class="button-close" @click="close()">
                  <span class="sr-only">Close</span>

                  <!-- <BaseIcon
                    name="close"
                    class="w-4 h-4"
                    @close="isOpen = false"
                  /> -->
                </button>
              </div>

              <div class="bg-white">
                <div
                  v-if="header"
                  class="p-8 tracking-wider border-b border-gray-100"
                >
                  <h1 class="text-xl font-semibold">{{ title }}</h1>
                </div>
                <div v-else class="p-6 lg:p-0" />

                <div class="p-8">
                  <slot name="content" />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, default: 'md:w-210' }) readonly width!: string
  @Prop({ type: Boolean, default: true }) readonly header!: boolean

  @Prop({ default: false })
  readonly isOpen!: boolean

  openModal() {
    this.$emit('openModal')
  }

  close() {
    this.$emit('close')
  }
}
</script>
