<script setup lang="ts">
import { useEventListener, tryOnMounted, set } from '@vueuse/core'
import { watch } from 'vue'
import { loadFromFile, loadFromUrl, queryUrl, sourceUrl } from '../hooks/use-cropper'
import { shouldBeShown } from '../hooks/use-image-form'
import { state } from '../hooks/state'

const emit = defineEmits(['cropped'])

const fromProps = defineProps({
	avatar: {
		default: '',
		type: String,
	},
	avatarSize: {
		default: 6,
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
 * When mounted, tries to load the URL from the query parameters.
 */
tryOnMounted(async() => {
	if (!await loadFromUrl(queryUrl)) {
		set(sourceUrl, queryUrl)
		state.source = undefined
		state.loading = false
	}
})

watch(() => state.finalCrop, () => {
	if (state.finalCrop) {
		emit('cropped', state.finalCrop)
	}
}) 

useEventListener(window, 'paste', (paste: ClipboardEvent) => {
	const items = paste.clipboardData?.items

	if (!items) {
		return
	}

	for (let i = 0; i < items.length; i++) {
		// Skip content if not image
		if (!items[i].type.includes('image')) {
			continue
		}

		// Retrieve image on clipboard as blob
		loadFromFile(items[i].getAsFile())

		// We only want one image
		return
	}
})
</script>

<template>
	<div id="vue-cup-avatar">
		<image-form v-bind="fromProps" />
		<modal :show="!shouldBeShown">
			<section class="twvac-flex twvac-flex-col twvac-items-center twvac-h-full">
				<cropper />
				<section class="twvac-flex twvac-flex-col twvac-items-center twvac-flex-shrink-0 twvac-w-full twvac-px-6">
					<toolbar />
				</section>
			</section>
		</modal>
	</div>
</template>
