<template>
  <Badge
    :text="$t(`pages.product.types.${product.type}`)"
    :icon-name="icon.icon"
    :icon-style="icon.style"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IconSetting } from '~/types/entities'
import { Product } from '~/types/models'

@Component
export default class TypeBadge extends Vue {
  @Prop({ type: Object }) product!: Product

  private types: Array<IconSetting> = [
    {
      type: 'image',
      icon: 'image',
      style: 'fas',
    },
    {
      type: 'youtube',
      icon: 'youtube',
      style: 'fab',
    },
    {
      type: 'collection',
      icon: 'box-open',
      style: 'fas',
    },
    {
      type: 'link',
      icon: 'link',
      style: 'fas',
    },
  ]

  private fallback: IconSetting = {
    type: 'fallback',
    icon: 'file',
    style: 'fas',
  }

  get icon(): IconSetting | undefined {
    return (
      this.types.find((setting: IconSetting) => {
        return setting.type === this.product.type
      }) ?? this.fallback
    )
  }
}
</script>
