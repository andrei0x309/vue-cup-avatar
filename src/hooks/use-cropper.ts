import { useSessionStorage, get, set, useDebounceFn } from '@vueuse/core'
import { Ref, ref } from 'vue'
import { CropperElement, CropData } from 'vue-advanced-cropper'
import { getMimeTypeFromBuffer, getMimeTypeFromBlob, getExtensionFromMimeType } from '../utils/mime-type'
import { state } from './state'
import { displayError } from './use-image-form'

export const element = ref() as Ref<CropperElement>

export const queryUrl = new URLSearchParams(window.location.search).get('url')
export const sourceUrl = useSessionStorage<string>('source-url', '')

/**
 * Rotates the image.
 */
export function rotate(angle: number) {
	get(element).rotate(angle)
}

/**
 * Resets the cropper.
 */
export function reset() {
	get(element).reset()
}

/**
 * Moves the stencil.
 */
export function transform(mode: 'center' | 'maximize' | 'reset') {
	if (mode === 'center') {
		get(element).setCoordinates(({ imageSize, coordinates }) => ({
			left: imageSize.width / 2 - coordinates.width / 2,
			top: imageSize.height / 2 - coordinates.height / 2,
		}))
	}

	if (mode === 'maximize') {
		const center = {
			left: get(element).coordinates.left + get(element).coordinates.width / 2,
			top: get(element).coordinates.top + get(element).coordinates.height / 2,
		}

		get(element).setCoordinates([
			({ imageSize }) => ({
				width: imageSize.width,
				height: imageSize.height,
			}),
			({ coordinates }) => ({
				left: center.left - coordinates.width / 2,
				top: center.top - coordinates.height / 2,
			}),
		])
	}

	if (mode === 'reset') {
		reset()
	}
}

/**
 * Zooms the image.
 */
export function zoom(mode: 'in' | 'out') {
	get(element).zoom(mode === 'in' ? 1.25 : 0.75)
}

/**
 * Flips the image.
 */
export function flip(mode: 'horizontal' | 'vertical') {
	console.log(get(element))
	if (get(element).appliedImageTransforms.flip) {
		const flip = get(element).appliedImageTransforms.flip
		get(element).flip(mode === 'horizontal' ? !flip.horizontal : flip.horizontal, mode === 'vertical' ? !flip.vertical : flip.vertical)  
	}
}

/**
 * Handles a crop event.
 */
export function change(crop: any) {
	state.crop = crop as CropData
}

/**
 * Handles an error event.
 */
export function error() {
	// TODO - This is fired sometimes for no specific reason
	// A catch would be to store the fact that an error occured,
	// and clear that state when the cropped loaded successfully

	useDebounceFn(() => reset(), 100)
}

export async function upload() {
	if (!state?.crop) {
		return
	}
	state.finalCrop = await new Promise((resolve) => state?.crop?.canvas.toBlob((blob) => resolve(blob as any)))
	// const fr = new FileReader()
	// fr.onloadend = async() => {
	// 	const split = (fr.result as string)?.split(',')
	// 	const body = {
	// 		data: split[1],
	// 		contentType: split[0].split(':')[1],
	// 		key: 'avatar',
	// 	}
	// 	await fetch('https://api.yup.io/accounts/account/profileImage', {
	// 		method: 'POST',
	// 		body: JSON.stringify(body),
	// 		headers: { 'Content-Type': 'application/json' },
	// 	})
	// }

	// fr.readAsDataURL(blob as Blob)
	// const formData = new FormData()
	// formData.append('data', blob as Blob)
	// formData.append('key', 'aaa')
	// formData.append('contentType', 'bbb')
}

/**
 * Loads an image from a file.
 */
export async function loadFromFile(file: File | null) {
	if (!file) {
		return
	}

	state.loading = true

	// Revokes the previous URL if it exists, for performance reasons.
	if (state.source?.url) {
		URL.revokeObjectURL(state.source.url)
	}

	// Reads the files and gets a blob, type and name.
	const url = URL.createObjectURL(file)
	const reader = new FileReader()

	try {
		return await new Promise((resolve, reject) => {
			reader.addEventListener('load', () => {
				state.loading = false

				if (!reader.result) {
					return reject(new Error('Could not read the file.'))
				}

				const type = getMimeTypeFromBuffer(reader.result as ArrayBuffer, file.type)
				if (!type?.startsWith('image')) {
					return reject(new Error(`Unsupported mime type: ${type}`))
				}

				state.source = {
					url,
					type,
					name: file.name,
				}

				resolve(true)
			})

			reader.readAsArrayBuffer(file)
		})
	} catch (error) {
		state.loading = false
		console.warn(error)

		return displayError([
			'Could not load this file, sorry. Do not try later, the same thing will happen.',
			'Seems like this is not a valid file.',
			'Sorry, we are too lazy to open this one.',
			'Is this even a file?',
			'I wish users knew how to use a computer.',
		], 'file')
	}
}

/**
 * Loads an image from an URL.
 */
export async function loadFromUrl(url: string | null) {
	if (!url) {
		return
	}

	state.loading = true

	try {
		const file = await fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const type = getMimeTypeFromBlob(blob)
				const fileName = new URL(url).pathname.split('/').pop() || `cropped.${getExtensionFromMimeType(type)}`
				set(sourceUrl, url)

				return new File([blob], fileName, { type })
			})

		return loadFromFile(file)
	} catch (error) {
		state.loading = false
		console.warn(error)

		if ((error as { message: 'string' }).message.includes('NetworkError when attempting to fetch resource.')) {
			return displayError('Your browser can not access this URL because the server denies it via CORS. You may want to try copying the image and pasting it in there instead.', 'url')
		}

		return displayError([
			'Could not load this one, sorry.',
			"No, this won't do.",
			'No, you are not linking to an image.',
			'Is this a URL?',
			'Roses are reds, violets are blue, this one does not point to an image, thank you.',
		], 'url')
	}
}
