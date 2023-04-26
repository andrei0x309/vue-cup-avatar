<template>
  <button
    style="border: 2px;"
    :class="[
      'twvac-p-1 twvac-flex twvac-items-center twvac-justify-center',
      'twvac-transition',
      'twvac-rounded-full',
      'twvac-text-gray-500 hover:twvac-text-pink-600',
      'focus:twvac-outline-none dark:focus-visible:twvac-text-pink-300 dark:focus-visible:twvac-bg-pink-400 focus-visible:twvac-text-pink-600 focus-visible:twvac-bg-pink-700 focus-visible:twvac-bg-opacity-15',
    ]"
  >
    <slot />
  </button>
</template>

<style scoped></style>
