<template>
  <div>
    <div class="mb-4 h-12 rounded shimmer"></div>

    <div v-for="(blocks, index) in 2" :key="index" class="mb-1">
      <div class="flex flex-col bg-white rounded rounded-md shadow-md">
        <div class="flex h-12 bg-white rounded shimmer">
          <div class="flex items-center">
            <span class="mr-4 rounded shimmer"></span>
          </div>
        </div>

        <div class="p-4">
          <div
            v-for="item in 5"
            :key="'filter_' + item"
            class="flex items-center mb-2"
          >
            <div class="mr-2 w-6 h-6 rounded shimmer"></div>
            <div class="w-full h-6 rounded shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
