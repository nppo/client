<template>
  <div class="mt-18">
    <div class="mb-12 border-b border-gray-200">
      <div class="container relative h-full mx-auto">
        <nav class="flex space-x-16" aria-label="Tabs">
          <LocaleLink
            v-for="(entity, index) in entities"
            :key="index"
            class="pt-5 pb-5 text-base font-medium border-b-2 border-transparent outline-none hover:border-yellow-brand whitespace-nowrap"
            :class="{
              'border-yellow-brand font-bold': activeEntity === entity,
            }"
            :path="
              entity === 'projects'
                ? '/person/' + $route.params.id + '/likes'
                : '/person/' + $route.params.id + '/likes/' + entity
            "
          >
            {{ $t(`entities.${entity}`) }}
          </LocaleLink>
        </nav>
      </div>
    </div>

    <div v-if="likes">
      <h1 class="inline-flex items-center mb-6 text-4xl font-bold">
        {{ $t(`entities.${activeEntity}`) }}
        <span class="p-1 ml-3 text-base font-bold rounded-sm bg-yellow-brand">
          <template v-if="activeEntity === 'projects'">
            {{ likes.likedProjects.length }}
          </template>
          <template v-else-if="activeEntity === 'parties'">
            {{ likes.likedParties.length }}
          </template>
          <template v-else-if="activeEntity === 'products'">
            {{ likes.likedProducts.length }}
          </template>
          <template v-else-if="activeEntity === 'people'">
            {{ likes.likedPeople.length }}
          </template>
        </span>
      </h1>

      <template
        v-if="activeEntity === 'projects' && !likes.likedProjects.length"
      >
        <p>{{ $t('pages.likes.no_results') }}</p>
      </template>
      <template
        v-else-if="activeEntity === 'parties' && !likes.likedParties.length"
      >
        <p>{{ $t('pages.likes.no_results') }}</p>
      </template>
      <template
        v-else-if="activeEntity === 'products' && !likes.likedProducts.length"
      >
        <p>{{ $t('pages.likes.no_results') }}</p>
      </template>
      <template
        v-else-if="activeEntity === 'people' && !likes.likedPeople.length"
      >
        <p>{{ $t('pages.likes.no_results') }}</p>
      </template>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="activeEntity === 'projects'">
          <ProjectBlock
            v-for="project in likes.likedProjects.slice(0, 9)"
            :key="project.id"
            :project="project"
          />
        </template>
        <template v-else-if="activeEntity === 'parties'">
          <PartyBlock
            v-for="party in likes.likedParties.slice(0, 9)"
            :key="party.id"
            :party="party"
          />
        </template>
        <template v-else-if="activeEntity === 'products'">
          <ProductBlock
            v-for="product in likes.likedProducts.slice(0, 9)"
            :key="product.id"
            :product="product"
          />
        </template>
        <template v-else-if="activeEntity === 'people'">
          <PersonBlock
            v-for="person in likes.likedPeople.slice(0, 9)"
            :key="person.id"
            :person="person"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Like, Person } from '~/types/models'

@Component({
  middleware: ['auth'],
})
export default class PersonLikesPage extends mixins(NavigationRouterHook) {
  public entities: Array<string> = ['products', 'projects', 'people', 'parties']

  get person(): Person {
    return this.$accessor.people.current
  }

  get likes(): Like | null {
    return this.$accessor.likes.all
  }

  get activeEntity(): string {
    return this.$route.params.entity || 'projects'
  }

  @Watch('activeEntity', { immediate: true })
  onActiveEntityChanged(entity: string) {
    if (!this.entities.includes(entity)) {
      return this.$nuxt.error({ statusCode: 404 })
    }
  }
}
</script>
