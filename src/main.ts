import type { App } from 'vue'
import './index.css'
import 'virtual:svg-icons-register'
import { VACropper } from './index'

export default {
	install: (app: App) => {
		app.component('VACropper', VACropper)
	},
}

export { VACropper }
