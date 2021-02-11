<template>
  <div
    class="container flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <p>{{ $t('pages.login.please_wait') }}&hellip;</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class LoginPage extends Vue {
  mounted() {
    setTimeout(() => {
      if (!this.$auth.loggedIn && !this.$route.params.code) {
        this.$auth.loginWith('api')
      }
    }, 1000)
  }
}
</script>
