<template>
	<div ref="container"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { Scene, PerspectiveCamera, WebGLRenderer } from "three"

@Component
export default class Head extends Vue {

	scene = new Scene()
	camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	renderer = new WebGLRenderer()

	mounted() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		(this.$refs.container as any).appendChild(this.renderer.domElement)
		new OBJLoader().load(
			"/models/deer.obj",
			obj => this.scene.add(obj)
		)
		this.animate()
	}

	private animate() {
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera)
	}
}
</script>

<style scoped lang="stylus">

</style>