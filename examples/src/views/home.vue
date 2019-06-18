<template>
  <div class="home">
	  <div class="circle" @click="!sound.isPlaying && play()" v-if="!isLoading">
		  <div class="plant1" :style="plantStyle" :class="plantClass">
		  	<img src="/img/leaf1-1.png" class="plant leaf1-1" :style="leafStyleSm">
		  	<img src="/img/leaf1-2.png" class="plant leaf1-2" :style="leafStyleSm">
		  	<img src="/img/plant1.png" class="plant">
		  </div>
		  <div class="plant2" :style="plantStyle" :class="plantClass">
		  	<img src="/img/leaf2-3.png" class="plant leaf2-3" :style="leafStyle">
		  	<img src="/img/plant2.png" class="plant">
		  	<img src="/img/leaf2-1.png" class="plant leaf2-1" :style="leafStyle">
		  	<img src="/img/leaf2-2.png" class="plant leaf2-2" :style="leafStyle">
		  </div>
	  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// import BeatBeat from "beat-beat-js"
import BeatBeat from "../../../src/beat-beat"

@Component
export default class Home extends Vue {

	isLoading = true

	private audioContext = new AudioContext()
	private sound!: BeatBeat

	private isTick: boolean = false
	private time: number = 0


	get plantClass() {
		return this.isTick ? "animated" : ""
	}

	get plantStyle() {
		return { transition: `all ${ this.time }s ease-in-out`}
	}

	get leafStyle() {
		return { transform: `rotateZ(${ 6 * (this.isTick ? -1 : 1) }deg)` }
	}

	get leafStyleSm() {
		return { transform: `rotateZ(${ 6 * (this.isTick ? 1 : -1) }deg)` }
	}

	async mounted() {
		this.sound = new BeatBeat("/sounds/Pional-Casualty.mp3")
		await this.sound.load()
		this.isLoading = false
	}

	play() {
		this.sound.play(this.onAnimate.bind(this))
	}

	private onAnimate(time: number) {
		this.time = time
		this.isTick = !this.isTick
	}
}
</script>
<style lang="stylus" scoped>
.home
	position fixed
	left 0
	right 0
	bottom 0
	top 0
	background lightblue
.circle
	width 280px
	height 280px
	transform translateY(-50%)
	position absolute
	left 0
	right 0
	top 50%
	margin 2em auto
	border 22px solid black
	background-color white
	border-radius 50%
.plant1
	position absolute
	left -198px
	bottom -3px
	width 400px
	height 395px
	transform rotateZ(-4deg)
	transform-origin 92.5% 99%
	&.animated
		transform rotateZ(4deg)
.plant2
	position absolute
	left 50px
	bottom -63px
	width 400px
	height 395px
	transform rotateZ(4deg)
	transform-origin 15% 83%
	&.animated
		transform rotateZ(-5deg)
.plant1, .plant2
	transition all 1s
.plant
	position absolute
	left 0
	right 0
	bottom 0
	top 0
	width 100%
.leaf2-1
	transform-origin 28% 54.5%
	transition all 1.1s
.leaf2-2
	transform-origin 30% 65.5%
	transition all 1.25s
.leaf2-3
	transform-origin 41% 38%
	transition all 2.5s
.leaf1-1
	transform-origin 65% 75%
	transition all 1.7s
.leaf1-2
	transform-origin 58% 52%
	transition all 1.5s
</style>

