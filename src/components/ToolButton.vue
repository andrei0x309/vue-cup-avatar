<template>
  <button
    :class="[
      'p-1 flex items-center justify-center',
      'transition',
      'rounded-full',
      'text-gray-500 hover:text-pink-600',
      'focus:outline-none dark:focus-visible:text-pink-300 dark:focus-visible:bg-pink-400 focus-visible:text-pink-600 focus-visible:bg-pink-700 focus-visible:bg-opacity-15'
    ]"
  >
    <slot />
  </button>
</template>

<style scoped></style>