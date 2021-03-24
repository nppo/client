<template>
  <div
    class="container flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <p>{{ $t('pages.logout.please_wait') }}&hellip;</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  middleware: ['auth'],
})
export default class LogoutPage extends Vue {
  mounted() {
    setTimeout(() => {
      if (this.$auth.loggedIn) {
        this.$auth.logout()
      }
    }, 1000)
  }
}
</script>
