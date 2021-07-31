<template>
  <div class="flex-1 pb-24">
    <Header
      image-filename="product_header_bg.jpg"
      has-dark-header
      has-search-bar
    >
      <div class="flex justify-between pb-4">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />

        <EditButton
          v-if="activePage === 'product' && product.can.update"
          :page="activePage"
          :entity-id="product.id"
        />
      </div>

      <div
        v-if="
          activePage === 'product' &&
          isCollectionType &&
          product.children.length
        "
        class="flex items-center mb-4 space-x-3"
      >
        <TypeBadge :product="product" />
        <h1 class="text-4xl text-white">{{ product.title }}</h1>
      </div>

      <div
        v-if="activePage === 'product'"
        class="flex"
        :class="
          isCollectionType && product.children.length
            ? 'justify-between'
            : 'justify-center'
        "
      >
        <div class="relative w-8/12">
          <ProductCard :product="highlightedProduct" />
        </div>

        <div
          v-if="isCollectionType && product.children.length"
          class="flex flex-col w-3/12"
        >
          <h4 class="px-2 mb-4 text-base font-bold text-white">
            {{ product.children.length }}
            {{ $tc('entities.product.default', product.children.length) }}
          </h4>

          <div
            class="flex flex-col flex-none flex-grow h-0 px-2 pb-2 space-y-3 overflow-y-auto"
          >
            <LocaleLink
              v-for="child in product.children"
              :key="child.id"
              :path="`/product/${child.id}`"
              class="flex bg-white rounded shadow"
            >
              <img
                class="flex-shrink-0 object-cover w-4/12 h-full rounded-l"
                src="https://picsum.photos/300/300"
              />
              <div
                class="flex flex-col items-baseline justify-center flex-1 px-3 py-2 space-y-2"
              >
                <TypeBadge :product="child" />
                <h5>{{ child.title }}</h5>
              </div>
            </LocaleLink>
          </div>
        </div>
      </div>
    </Header>

    <div class="container mx-auto mt-40">
      <NuxtChild />
    </div>

    <div class="container relative px-12 mx-auto">
      <div
        v-if="activePage === 'product'"
        class="flex justify-between space-x-32 mt-18"
      >
        <div class="w-8/12">
          <div class="mb-18">
            <div v-if="slicedMeta.length > 0" class="mb-12">
              <h2 class="mb-3 text-3xl font-bold">
                {{ $t('pages.product._id.headings.facts') }}
              </h2>
              <div class="grid grid-cols-6 gap-4">
                <div v-for="meta in slicedMeta" :key="meta.id">
                  <h4 class="font-bold uppercase">
                    {{ meta.label }}
                  </h4>
                  {{ meta.value }}
                </div>
              </div>
            </div>

            <div
              v-if="product.summary && product.summary.length > 0"
              class="mb-8"
            >
              <h2 class="mb-3 text-3xl">
                {{ $t('pages.product._id.headings.summary') }}
              </h2>

              {{ product.summary }}
            </div>

            <div v-if="product.description && product.description.length > 0">
              <h3 class="mb-3 text-2xl">
                {{ $t('pages.product._id.headings.description') }}
              </h3>

              {{ product.description }}
            </div>
          </div>

          <div v-if="recentProducts.length > 0">
            <h2 class="mb-12 text-3xl font-bold">
              {{ $t('pages.product._id.headings.more_products') }}
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div v-for="product in recentProducts" :key="product.id">
                <ProductBlock :product="product" />
              </div>
            </div>
          </div>
        </div>

        <div class="w-4/12">
          <div v-if="product.owner">
            <h3 class="mb-4 text-2xl font-bold">
              {{ $t('pages.product._id.headings.contact') }}
            </h3>

            <PersonBlock :person="product.owner" class="mb-8" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="partOfItems">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.product._id.headings.part_of') }}
            </h3>

            <ProjectsList :projects="product.projects" />
            <ParentsList :parents="product.parents" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="product.people && product.people.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.product._id.headings.people') }}
            </h3>

            <PeopleList :people="product.people" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="product.parties && product.parties.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.product._id.headings.parties') }}
            </h3>

            <PartiesList :parties="product.parties" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="product.keywords && product.keywords.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.product._id.headings.keywords') }}
            </h3>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="keyword in product.keywords"
                :key="'product_keyword_' + keyword.id"
                :text="keyword.label"
                class="mb-2 mr-2"
              />
            </div>

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="product.themes && product.themes.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.product._id.headings.themes') }}
            </h3>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="theme in product.themes"
                :key="'product_theme_' + theme.id"
                :text="theme.label"
                class="mb-2 mr-2"
              />
            </div>

            <hr class="mb-8 border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaData } from '~/types/entities'
import { Product } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.products.fetchCurrent(id)

    if ($accessor.products.all.length < 1) {
      await $accessor.products.fetchAll()
    }
  },
})
export default class ProductDetailPage extends mixins(NavigationRouterHook) {
  get activePage(): string {
    const basePath =
      this.$i18n.defaultLocale !== this.$i18n.locale
        ? '/' + this.$i18n.locale + '/product/' + this.$route.params.id + '/'
        : '/product/' + this.$route.params.id + '/'

    return this.$route.path.substring(basePath.length) || 'product'
  }

  get product(): Product {
    return this.$accessor.products.current
  }

  get products(): Product[] {
    return this.$accessor.products.all
  }

  get slicedMeta(): MetaData[] {
    return (
      this.$accessor.products.current.meta?.filter((meta: MetaData) => {
        return meta.value != null
      }) || []
    )
  }

  get recentProducts(): Product[] {
    const products = [...(this.products || [])]

    return products
      .sort((productA, productB) =>
        productB.publishedAt === null
          ? -1
          : productB.publishedAt.localeCompare(productA.publishedAt)
      )
      .slice(0, 2)
  }

  get isCollectionType(): boolean {
    return this.product.type === 'collection'
  }

  get highlightedProduct(): Product {
    return this.isCollectionType && this.product.children?.length
      ? this.product.children[0]
      : this.product
  }

  get partOfItems() {
    return (
      (this.product.projects && this.product.projects.length > 0) ||
      (this.product.parents && this.product.parents.length > 0)
    )
  }
}
</script>
