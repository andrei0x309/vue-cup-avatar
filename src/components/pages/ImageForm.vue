<script setup lang="ts">
import { watch } from "vue";
import { get } from "@vueuse/core";
import { loadFromFile, loadFromUrl, sourceUrl } from "@/hooks/use-cropper";
import { errors, resetError, fileInput } from "@/hooks/use-image-form";

const props = defineProps({
  avatar: {
    default: "",
    type: String,
  },
  avatarSize: {
    default: 200,
    type: Number,
  },
  avatarMarginBottom: {
    default: 0.8,
    type: Number,
  },
  avatarMarginTop: {
    default: 0.8,
    type: Number,
  },
  noAvatar: {
    default: false,
    type: Boolean,
  },
  showLoadFromUrl: {
    default: false,
    type: Boolean,
  },
});

/**
 * Clears error when needed.
 */
watch([sourceUrl], () => resetError("url"));

/**
 * Handles file input.
 */
async function onFileInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.item(0);

  if (!file) {
    return;
  }

  await loadFromFile(file);
}

/**
 * Handles URL input.
 */
async function onUrlInput() {
  await loadFromUrl(get(sourceUrl));
}
</script>

<template>
  <section
    id="va-from"
    class="twvac-flex twvac-flex-col twvac-items-center twvac-justify-center twvac-w-full twvac-max-w-lg twvac-pointer-events-auto"
  >
    <template v-if="!props.noAvatar">
      <img
        v-if="props.avatar"
        :src="props.avatar"
        alt="avatar"
        :style="{
          width: props.avatarSize + 'rem',
          height: props.avatarSize + 'rem',
          borderRadius: '50%',
          marginBottom: props.avatarMarginBottom + 'rem',
          marginTop: props.avatarMarginTop + 'rem',
        }"
      />
    </template>

    <template v-if="props.showLoadFromUrl">
      <!-- Image URL -->
      <div class="twvac-flex twvac-flex-col twvac-w-full twvac-max-w-lg">
        <label for="url" class="twvac-block twvac-font-medium twvac-sr-only"
          >Image URL</label
        >

        <!-- Input wrapper -->
        <div class="twvac-flex twvac-mt-1 twvac-rounded-md twvac-shadow-sm">
          <!-- Input -->
          <div
            class="twvac-relative twvac-z-10 twvac-flex twvac-items-stretch twvac-flex-grow"
            :class="errors.url ? 'z-10' : ''"
          >
            <!-- Icon -->
            <div
              class="twvac-absolute twvac-inset-y-0 twvac-left-0 twvac-flex twvac-items-center twvac-pl-3 twvac-pointer-events-none"
            >
              <icon
                name="mdi:link-variant"
                class="twvac-w-5 twvac-h-5 dark:twvac-text-gray-400 twvac-text-gray-800"
              />
            </div>

            <!-- Actual input -->
            <input
              id="url"
              v-model="sourceUrl"
              type="text"
              name="url"
              placeholder="https://"
              :class="[
                'twvac-block twvac-w-full twvac-py-2.5 twvac-pl-10 twvac-transition twvac-rounded-none twvac-rounded-l-md',
                'dark:twvac-bg-gray-800 dark:twvac-border-gray-700',
                'twvac-bg-gray-200 twvac-border-gray-300',
                'focus:twvac-outline-none',
                'sm:twvac-text-sm',
                errors.url
                  ? 'twvac-ring-red-300 twvac-border-red-300 focus:twvac-ring-red-300 focus:twvac-border-red-300'
                  : 'focus:twvac-ring-pink-300 focus:twvac-border-pink-300',
              ]"
              @keypress.enter="onUrlInput"
            />
          </div>

          <!-- Upload button -->
          <button
            class="twvac-relative twvac-inline-flex twvac-items-center twvac-px-4 twvac-py-2 -twvac-ml-px space-x-2 twvac-text-sm twvac-font-medium dark:twvac-text-gray-300 dark:twvac-bg-gray-800 dark:twvac-border-gray-700 twvac-bg-gray-200 twvac-border-gray-300 twvac-transition twvac-border twvac-border-l-0 focus:twvac-border-l twvac-rounded-r-md hover:twvac-bg-gray-700 focus:twvac-outline-none focus:twvac-ring-1 focus:twvac-ring-pink-300 focus:twvac-border-pink-300 hover:twvac-z-20 focus:twvac-z-20"
            @click="onUrlInput"
          >
            <icon
              name="mdi:arrow-right"
              class="twvac-w-5 twvac-h-5 dark:twvac-text-gray-400 twvac-text-gray-800"
            />
          </button>
        </div>

        <!-- Error -->
        <span
          v-if="errors.url"
          class="twvac-mt-2 twvac-text-sm twvac-text-red-300"
          v-text="errors.url"
        />
      </div>

      <span class="twvac-my-2 dark:twvac-text-gray-400 twvac-text-gray-800">or</span>
    </template>

    <!-- Upload button -->
    <div class="twvac-flex twvac-flex-col twvac-max-w-lg">
      <!-- Input -->
      <label
        for="file-upload"
        :class="[
          'twvac-group twvac-flex twvac-items-center twvac-justify-center',
          'twvac-rounded twvac-border twvac-shadow-sm',
          'dark:twvac-bg-gray-800 dark:twvac-border-gray-700',
          'twvac-bg-gray-200 twvac-border-gray-300',
          'twvac-h-full twvac-py-2.5 twvac-px-12',
          'twvac-cursor-pointer',
          'hover:twvac-bg-gray-700',
          'focus-within:twvac-ring-2 focus-within:twvac-ring-pink-300',
          'twvac-transform twvac-transition',
        ]"
      >
        <div class="twvac-flex twvac-items-center twvac-space-x-2 twvac-text-center">
          <icon name="uil:image-upload" class="twvac-w-5 twvac-h-5 twvac-text-gray-500" />
          <div class="twvac-flex">
            <div
              class="twvac-relative twvac-text-sm twvac-font-medium twvac-text-gray-400 twvac-transition twvac-rounded-md twvac-cursor-pointer focus-within:twvac-outline-none"
            >
              <span>Use a local image</span>
              <input
                id="file-upload"
                name="file-upload"
                accept="image/*"
                type="file"
                class="twvac-sr-only"
                ref="fileInput"
                @change="onFileInput"
              />
            </div>
          </div>
        </div>
      </label>

      <!-- Error -->
      <span
        v-if="errors.file"
        class="twvac-mt-2 twvac-text-sm twvac-text-red-300"
        v-text="errors.file"
      />
    </div>
  </section>
</template>

<style scoped></style>
