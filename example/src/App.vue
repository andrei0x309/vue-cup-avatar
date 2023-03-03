<script setup lang="ts">
import { VACropper } from 'vue-cup-avatar'
import 'vue-cup-avatar/dist/style.css'

const yourUploadFunction = (data: Blob) => {
	console.log(data)
}

</script>

<template>
	<VACropper avatar="./logo.svg" @cropped="yourUploadFunction" />
</template>
