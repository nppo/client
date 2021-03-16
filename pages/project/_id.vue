<template>
  <div class="flex-1 pb-24">
    <Header has-search-bar>
      <div class="flex items-center justify-between mt-8">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
        <EditButton
          v-if="activePage === 'project' && project.can.update"
          :page="activePage"
          :entity-id="project.id"
        />
      </div>

      <div class="pt-32 text-white">
        <h1 class="pb-6 text-4xl font-bold">
          {{ project.title }}
        </h1>
      </div>
    </Header>

    <div v-if="activePage === 'project'" class="mb-12 border-b border-gray-200">
      <div class="container relative h-full mx-auto">
        <nav class="flex space-x-16" aria-label="Tabs">
          <LocaleLink
            v-for="(page, index) in pages"
            :key="index"
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activePage === page,
            }"
            :path="
              page === 'project'
                ? '/project/' + $route.params.id
                : '/project/' + $route.params.id + '/' + page
            "
          >
            {{ $t('pages.project._id.types.' + page) }}
          </LocaleLink>
        </nav>
      </div>
    </div>

    <div class="container relative px-12 mx-auto">
      <div
        v-if="activePage === 'project'"
        class="flex justify-between space-x-32 mt-18"
      >
        <div class="w-8/12">
          <div class="mb-18">
            <div class="mb-10">
              <h2 class="mb-3 text-3xl font-bold">
                {{ $t('pages.project._id.headings.purpose') }}
              </h2>

              {{ project.purpose }}
            </div>
            <div>
              <h3 class="mb-3 text-2xl font-bold">
                {{ $t('pages.project._id.headings.description') }}
              </h3>

              {{ project.description }}
            </div>
          </div>

          <div>
            <h2 class="mb-12 text-3xl font-bold">
              {{ $t('pages.project._id.headings.recent_products') }}
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div v-for="product in recentProducts" :key="product.id">
                <ProductBlock :product="product" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-4/12">
          <div v-if="project.owner">
            <h3 class="mb-4 text-2xl font-bold">
              {{ $t('pages.project._id.headings.contact') }}
            </h3>

            <PersonBlock :person="project.owner" class="mb-8" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="project.people && project.people.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.project._id.headings.people') }}
            </h3>

            <PeopleList :people="project.people" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="project.parties && project.parties.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.project._id.headings.parties') }}
            </h3>

            <PartiesList :parties="project.parties" />

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="project.tags && project.tags.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.project._id.headings.tags') }}
            </h3>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="tag in project.tags"
                :key="'project_tag_' + tag.id"
                :text="tag.label"
                class="mb-2 mr-2"
              />
            </div>

            <hr class="mb-8 border-gray-200" />
          </div>

          <div v-if="project.themes && project.themes.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.project._id.headings.themes') }}
            </h3>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="theme in project.themes"
                :key="'project_theme_' + theme.id"
                :text="theme.label"
                class="mb-2 mr-2"
              />
            </div>

            <hr class="mb-8 border-gray-200" />
          </div>
        </div>
      </div>

      <NuxtChild
        :key="'project/' + $route.params.id + '/' + activePage"
        :project-content="projectContent"
        class="mt-18"
        keep-alive
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Type } from '~/types/entities'
import { Project, Product } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.projects.fetchCurrent(Number(id))

    if ($accessor.types.all.length < 1) {
      await $accessor.types.fetchAll()
    }
  },
})
export default class ProjectDetailPage extends mixins(NavigationRouterHook) {
  public pages: Array<string> = ['project', 'products', 'people', 'parties']

  get project(): Project {
    return this.$accessor.projects.current
  }

  get types(): Type[] {
    return this.$accessor.types.all
  }

  get projectContent(): Array<any> | undefined {
    if (this.activePage === 'people') {
      return this.project.people
    }

    if (this.activePage === 'parties') {
      return this.project.parties
    }

    return this.project.products
  }

  get activePage(): string {
    const basePath =
      this.$i18n.defaultLocale !== this.$i18n.locale
        ? '/' + this.$i18n.locale + '/project/' + this.$route.params.id + '/'
        : '/project/' + this.$route.params.id + '/'

    return this.$route.path.substring(basePath.length) || 'project'
  }

  get recentProducts(): Product[] {
    const products = [...(this.project.products || [])]

    return products
      .sort((productA, productB) =>
        productB.publishedAt.localeCompare(productA.publishedAt)
      )
      .slice(0, 2)
  }
}
</script>
