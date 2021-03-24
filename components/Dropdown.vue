<template>
  <div class="relative">
    <div ref="dropdown" @click="toggleDropdown">
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
        v-show="active"
        ref="items"
        class="absolute right-0 z-10 px-4 py-3 mt-2 overflow-y-auto text-blue-800 break-words origin-top-right bg-white rounded shadow min-w-40 max-h-48"
      >
        <slot ref="items" name="items" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class Dropdown extends Vue {
  private active: boolean = false

  @Watch('active')
  updateActiveState() {
    if (this.active) {
      this.$emit('update:is-active', true)
    } else {
      this.$emit('update:is-active', false)
    }
  }

  handleClickEvent(event: Event) {
    const isInsideDropdown = (this.$refs.dropdown as Element).contains(
      event.target as Node
    )

    if (isInsideDropdown || !this.active) {
      return
    }

    const isOutside = !(this.$refs.items as Element).contains(
      event.target as Node
    )

    if (isOutside) {
      this.active = false
    }
  }

  toggleDropdown() {
    this.active = !this.active
  }

  mounted() {
    document.addEventListener('click', this.handleClickEvent)

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.handleClickEvent)
    })
  }
}
</script>
