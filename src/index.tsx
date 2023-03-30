import { render } from 'preact'
import * as BABYLON from '@babylonjs/core'
import App from './components/app'
import Core from './js/core'
// import frag from './shaders/gate.frag'
// import vert from './shaders/gate.vert'

// BABYLON.Effect.ShadersStore["gateVertexShader"] = vert
// BABYLON.Effect.ShadersStore["gateFragmentShader"] = frag

function CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
	const scene = new BABYLON.Scene(engine)
	const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera(
		'Camera',
		-Math.PI / 2,
		Math.PI / 2,
		1.0,
		BABYLON.Vector3.Zero(),
		scene
	)
	camera.minZ = 0.01
	camera.attachControl(canvas, true)
	const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(1, 1, 1), scene)
	light.intensity = 1.0

	const plane = BABYLON.MeshBuilder.CreatePlane('box', { width: 0.5, height: 0.5 })
	// plane.material = new BABYLON.ShaderMaterial('mat', scene, {vertexSource: vert, fragmentSource: frag})
	plane.showBoundingBox = true

	return scene
}

const root = document.getElementById('root')
if (root) {
	render(<App />, root)

	const core = new Core()
	core.start(CreateScene)
}
