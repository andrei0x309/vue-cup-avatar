<script setup lang="ts">
import { watch } from 'vue'
import { get } from '@vueuse/core'
import { loadFromFile, loadFromUrl, sourceUrl } from '@/hooks/use-cropper'
import { errors, resetError, fileInput } from '@/hooks/use-image-form'

const props = defineProps({
	avatar: {
		default: '',
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
})

/**
 * Clears error when needed.
 */
watch([sourceUrl], () => resetError('url'))

/**
 * Handles file input.
 */
async function onFileInput(event: Event) {
	const target = event.target as HTMLInputElement
	const file = target.files?.item(0)

	if (!file) {
		return
	}

	await loadFromFile(file)
}

/**
 * Handles URL input.
 */
async function onUrlInput() {
	await loadFromUrl(get(sourceUrl))
}

</script>

<template>
	<section id="va-from" class="flex flex-col items-center justify-center w-full max-w-lg pointer-events-auto">
		
		<template v-if="!props.noAvatar">
		<img v-if="props.avatar" :src="props.avatar" alt="avatar" :style="{ width: props.avatarSize + 'rem', height: props.avatarSize + 'rem', borderRadius: '50%', marginBottom: props.avatarMarginBottom + 'rem', marginTop: props.avatarMarginTop + 'rem' }" />
		</template>

		<template v-if="props.showLoadFromUrl">
		<!-- Image URL -->
		<div class="flex flex-col w-full max-w-lg">
			<label for="url" class="block font-medium sr-only">Image URL</label>

			<!-- Input wrapper -->
			<div class="flex mt-1 rounded-md shadow-sm">
				<!-- Input -->
				<div class="relative z-10 flex items-stretch flex-grow" :class="errors.url ? 'z-10' : ''">
					<!-- Icon -->
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<icon name="mdi:link-variant" class="w-5 h-5 dark:text-gray-400 text-gray-800" />
					</div>

					<!-- Actual input -->
					<input
						id="url"
						v-model="sourceUrl"
						type="text"
						name="url"
						placeholder="https://"
						:class="[
							'block w-full py-2.5 pl-10 transition rounded-none rounded-l-md',
							'dark:bg-gray-800 dark:border-gray-700',
							'bg-gray-200 border-gray-300',
							'focus:outline-none',
							'sm:text-sm',
							errors.url
								? 'ring-red-300 border-red-300 focus:ring-red-300 focus:border-red-300'
								: 'focus:ring-pink-300 focus:border-pink-300'
						]"
						@keypress.enter="onUrlInput"
					/>
				</div>

				<!-- Upload button -->
				<button
					class="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium 
					dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700
					bg-gray-200 border-gray-300
					transition  border border-l-0  focus:border-l rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 hover:z-20 focus:z-20"
					@click="onUrlInput"
				>
					<icon name="mdi:arrow-right" class="w-5 h-5 dark:text-gray-400 text-gray-800" />
				</button>
			</div>

			<!-- Error -->
			<span v-if="errors.url" class="mt-2 text-sm text-red-300" v-text="errors.url" />
		</div>

		<span class="my-2 dark:text-gray-400 text-gray-800">or</span>
		</template>

		<!-- Upload button -->
		<div class="flex flex-col max-w-lg">
			<!-- Input -->
			<label
				for="file-upload"
				:class="[
					'group flex items-center justify-center',
					'rounded border shadow-sm',
					'dark:bg-gray-800 dark:border-gray-700',
					'bg-gray-200 border-gray-300',
					'h-full py-2.5 px-12',
					'cursor-pointer',
					'hover:bg-gray-700',
					'focus-within:ring-2 focus-within:ring-pink-300',
					'transform transition'
				]"
			>
				<div class="flex items-center space-x-2 text-center">
					<icon name="uil:image-upload" class="w-5 h-5 text-gray-500" />
					<div class="flex">
						<div class="relative text-sm font-medium text-gray-400 transition rounded-md cursor-pointer focus-within:outline-none">
							<span>Use a local image</span>
							<input
								id="file-upload"
								name="file-upload"
								accept="image/*"
								type="file"
								class="sr-only"
								ref="fileInput"
								@change="onFileInput"
							/>
						</div>
					</div>
				</div>
			</label>

			<!-- Error -->
			<span v-if="errors.file" class="mt-2 text-sm text-red-300" v-text="errors.file" />
		</div>
	</section>
</template>
