<template>
  <button
    v-if="showLikeButton"
    type="button"
    class="inline-flex items-center px-2 py-1 space-x-2 font-bold border border-blue-500 rounded-md focus:outline-none"
    :class="{
      'text-blue-500': !hasLiked,
      'text-white bg-blue-500': hasLiked,
      'animate-pulse': toggleLikeLoading,
    }"
    :disabled="toggleLikeLoading"
    @click.prevent="toggleLike"
  >
    <font-awesome-icon class="block" :icon="hasLiked ? 'minus' : 'plus'" />
    <span>{{ hasLiked ? $t('general.unfollow') : $t('general.follow') }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Models } from '~/types/enums'
import { User } from '~/types/models'

@Component
export default class FollowButton extends Vue {
  @Prop({ type: String, required: true }) entityId!: string
  @Prop({
    type: String,
    required: true,
    validator: (value) => ['person', 'party'].includes(value),
  })
  entity!: 'person' | 'party'

  public toggleLikeLoading: boolean = false

  async toggleLike() {
    this.toggleLikeLoading = true
    await this.$accessor.likes.store({
      likableType: Models[this.entity],
      likableId: this.entityId,
    })
    this.toggleLikeLoading = false
  }

  get showLikeButton(): boolean {
    if (!this.$auth.loggedIn) {
      return false
    }

    const user: User = (this.$auth.user as unknown) as User

    if (
      this.entity === 'person' &&
      (!user.person || user.person.id === this.entityId)
    ) {
      return false
    }

    return true
  }

  get hasLiked() {
    if (this.entity === 'person') {
      return this.$accessor.likes.hasPerson(this.entityId)
    }
    return this.$accessor.likes.hasParty(this.entityId)
  }
}
</script>
