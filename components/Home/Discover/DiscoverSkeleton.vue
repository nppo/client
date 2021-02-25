<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="(block, index) in 4"
      :key="index"
      class="bg-white rounded-md shadow-md"
    >
      <div class="w-full h-32 mb-3 shimmer"></div>
      <div class="flex justify-between px-2 mb-2">
        <div class="w-1/3 h-2 mb-4 rounded shimmer"></div>
        <div class="w-1/3 h-2 mb-4 rounded shimmer"></div>
      </div>
      <div class="p-2">
        <div class="w-1/2 h-2 mb-4 rounded shimmer"></div>
        <div class="w-full h-2 mb-3 rounded shimmer"></div>
        <div class="w-full h-2 mb-3 rounded shimmer"></div>
        <div class="w-full h-2 mb-3 rounded shimmer"></div>
        <div class="w-full h-2 mb-3 rounded shimmer"></div>
      </div>
    </div>
  </div>
</template>
