import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer' // Augments the scene with the debug methods
import '@babylonjs/inspector' // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version
export default class Main {
	private readonly canvas: HTMLCanvasElement

	private readonly engine: Engine

	private readonly scene: Scene

	constructor() {
		// create the canvas html element and attach it to the webpage
		this.canvas = document.createElement('canvas')
		this.canvas.style.width = '100%'
		this.canvas.style.height = '100%'
		this.canvas.id = 'gameCanvas'
		document.body.appendChild(this.canvas)

		this.engine = new Engine(this.canvas, true)
		this.scene = new Scene(this.engine)

		const camera: ArcRotateCamera = new ArcRotateCamera(
			'Camera',
			Math.PI / 2,
			Math.PI / 2,
			2,
			Vector3.Zero(),
			this.scene
		)
		camera.attachControl(this.canvas, true)
		new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene)
		MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene)
	}

	start() {
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
