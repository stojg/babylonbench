import '@babylonjs/core/Debug/debugLayer' // Augments the scene with the debug methods
import '@babylonjs/inspector' // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version
import { Engine } from '@babylonjs/core'
import type { Scene } from '@babylonjs/core'
import * as BABYLON from '@babylonjs/core'

type P = {
	CreateScene(e: Engine, c: HTMLCanvasElement): Scene
}
export default class Core {
	private readonly canvas: HTMLCanvasElement

	private readonly engine: Engine
	private scene: Scene

	constructor() {
		// create the canvas html element and attach it to the webpage
		this.canvas = document.createElement('canvas')
		this.canvas.style.width = '100%'
		this.canvas.style.height = '100%'
		this.canvas.id = 'gameCanvas'
		document.body.appendChild(this.canvas)

		this.engine = new Engine(this.canvas, true)
	}

	start(createScene: (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => Scene) {
		this.scene = createScene(this.engine, this.canvas)

		// hide/show the Inspector
		window.addEventListener('keydown', ev => {
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.metaKey && ev.code === 'KeyI') {
				if (this.scene.debugLayer.isVisible()) {
					this.scene.debugLayer.hide()
				} else {
					this.scene.debugLayer.show().catch(console.error)
				}
			}
		})

		// run the main render loop
		this.engine.runRenderLoop(() => {
			this.scene.render()
		})
	}
}
