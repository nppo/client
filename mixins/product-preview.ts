import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ProductTypeButton } from '~/types/entities'
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
