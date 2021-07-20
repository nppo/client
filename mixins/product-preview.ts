import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ProductTypeButton } from '~/types/entities'
import { Models } from '~/types/enums'
import { Product } from '~/types/models'

@Component
export default class ProductPreview extends Vue {
  @Prop({ type: Object }) product!: Product

  private defaultButtons: Array<ProductTypeButton> = [
    {
      iconName: 'share-alt',
      iconStyle: 'fas',
      text: String(this.$t('pages.product._id.actions.share')),
      textColor: 'white',
      color: 'blue-500',
    },
    {
      iconName: 'bookmark',
      iconStyle: 'fas',
      text: String(this.$t('pages.product._id.actions.bookmark')),
      textColor: 'white',
      color: 'blue-500',
      on: {
        click: () =>
          this.$accessor.likes.store({
            likableId: this.product.id,
            likableType: Models.product,
          }),
      },
    },
  ]

  protected customButtons: Array<ProductTypeButton> = []

  get settings(): Object {
    return {
      product: this.product,
      buttons: this.buttons,
    }
  }

  get buttons(): Array<ProductTypeButton> {
    return this.defaultButtons.concat(this.customButtons)
  }
}
