<template>
  <div class="relative">
    <div @click="active = !active">
      <slot name="button" />
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="active"
        ref="items"
        class="absolute right-0 px-4 py-3 mt-2 text-blue-800 origin-top-right bg-white rounded shadow-input min-w-40"
      >
        <slot ref="items" class="" name="items" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Dropdown extends Vue {
  active = false
}
</script>
