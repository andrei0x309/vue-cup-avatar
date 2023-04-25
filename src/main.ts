import './index.css'
import 'virtual:svg-icons-register'
import type { App } from 'vue'
import { VACropper } from './index'

export default {
	install: (app: App) => {
		app.component('VACropper', VACropper)
	},
}

export { VACropper }
