<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { DraggableElement, DraggableArea, StencilPreview, ResizeEvent } from 'vue-advanced-cropper'
import type { Coordinates, Image, DragEvent, MoveEvent } from 'vue-advanced-cropper'

const emit = defineEmits(['move', 'move-end', 'resize', 'resize-end'])
const props = defineProps<{
	image: Image
	coordinates: Coordinates
	transitions: any
	stencilCoordinates: Coordinates
}>()

const style = computed(() => {
	const { height, width, left, top } = props.stencilCoordinates
	const style = {
		width: `${width}px`,
		height: `${height}px`,
		transform: `translate(${left}px, ${top}px)`,
		transition: undefined as string | undefined,
	}

	if (props.transitions && props.transitions.enabled) {
		style.transition = `${props.transitions.time}ms ${props.transitions.timingFunction}`
	}

	return style
})

function onMove(moveEvent: MoveEvent) {
	emit('move', moveEvent)
}

function onMoveEnd() {
	emit('move-end')
}

function onResize(dragEvent: DragEvent, corner: `${'top' | 'bottom'}-${'left' | 'right'}`) {
	const { left, top } = dragEvent.shift()
	const directions = {
		respect: '' as 'height' | 'width',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	}

	switch (corner) {
		case 'top-right': {
			directions.top += -top
			directions.right += left
			directions.respect = 'height'
			break
		}

		case 'top-left': {
			directions.top += -top
			directions.left -= left
			directions.respect = 'height'
			break
		}

		case 'bottom-right': {
			directions.bottom += top
			directions.right += left
			directions.respect = 'height'
			break
		}

		case 'bottom-left': {
			directions.bottom += top
			directions.left -= left
			directions.respect = 'width'
			break
		}
	}

	emit('resize', new ResizeEvent(directions, {
		respectDirection: directions.respect,
	}))
}

function onResizeEnd() {
	emit('resize-end')
}
</script>

<template>
	<div class="twvac-absolute twvac-border twvac-border-pink-200 twvac-border-dashed" :style="style">
		<!-- Inner circle -->
		<div class="twvac-absolute twvac-inset-0 twvac-z-10 twvac-border twvac-border-pink-200 twvac-border-dashed twvac-rounded-full twvac-pointer-events-none" />

		<!-- Stencil components -->
		<div class="twvac-relative twvac-w-full twvac-h-full">
			<!-- Top right drag -->
			<draggable-element
				class="twvac-absolute twvac-top-0 twvac-right-0 twvac-w-1/2 twvac-h-1/2"
				style="cursor: ne-resize;"
				@drag="onResize($event, 'top-right')"
				@drag-end="onResizeEnd"
			/>

			<!-- Top left drag -->
			<draggable-element
				class="twvac-absolute twvac-top-0 twvac-left-0 twvac-w-1/2 twvac-h-1/2"
				style="cursor: nw-resize;"
				@drag="onResize($event, 'top-left')"
				@drag-end="onResizeEnd"
			/>

			<!-- Bottom right drag -->
			<draggable-element
				class="twvac-absolute twvac-bottom-0 twvac-right-0 twvac-w-1/2 twvac-h-1/2"
				style="cursor: nw-resize;"
				@drag="onResize($event, 'bottom-right')"
				@drag-end="onResizeEnd"
			/>

			<!-- Bottom left drag -->
			<draggable-element
				class="twvac-absolute twvac-bottom-0 twvac-left-0 twvac-w-1/2 twvac-h-1/2"
				style="cursor: ne-resize;"
				@drag="onResize($event, 'bottom-left')"
				@drag-end="onResizeEnd"
			/>

			<!-- Move area and preview -->
			<draggable-area class="twvac-cursor-move" @move="onMove" @move-end="onMoveEnd">
				<stencil-preview
					class="twvac-overflow-hidden twvac-rounded-full twvac-cursor-move"
					:image="image"
					:coordinates="coordinates"
					:width="stencilCoordinates.width"
					:height="stencilCoordinates.height"
					:transitions="transitions"
				/>
			</draggable-area>
		</div>
	</div>
</template>

<style scoped></style>